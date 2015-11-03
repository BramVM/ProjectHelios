var makeGeometry = function(data){
  var result = GreedyMesh (data.voxels, data.dims);
  var geometry = new THREE.Geometry();

  for(var i=0; i<result.vertices.length; ++i) {
    var q = result.vertices[i];
    geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
  }

  for(var i=0; i<result.faces.length; ++i) {
    var q = result.faces[i];
    if(q.length === 5) {
      var color = q[4];
      if(data.colors){
        for(j=0;j<data.colors.length;j++){
          if (q[4]-1==j) {
            color = data.colors[j];
          }
        }
      }
      var f1 = new THREE.Face3(q[0], q[1], q[2]);
      f1.color = new THREE.Color(color);
      f1.vertexColors = [f1.color,f1.color,f1.color];
      geometry.faces.push(f1);
      var f2 = new THREE.Face3(q[0], q[2], q[3]);
      f2.color = new THREE.Color(color);
      f2.vertexColors = [f2.color,f2.color,f2.color];
      geometry.faces.push(f2);
    } else if(q.length == 4) {
      var color = q[3];
      if(data.colors){
        for(j=0;j<data.colors.length;j++){
          if (q[3]-1==j) {
            color = data.colors[j];
          }
        }
      }
      var f = new THREE.Face3(q[0], q[1], q[2]);
      f.color = new THREE.Color(color);
      f.vertexColors = [f.color,f.color,f.color];
      geometry.faces.push(f);
    }
  }
  geometry.computeFaceNormals();
  return geometry;
}

var spawnMesh = function(data){
	var scale = 7;
  var positionwrapper =  new THREE.Object3D();
	var geometry = makeGeometry(data);
  var material  = new THREE.MeshLambertMaterial({
    vertexColors: true
  });
  positionwrapper.surfacemesh = new THREE.Mesh( geometry, material );
  positionwrapper.surfacemesh.doubleSided = false;
  positionwrapper.surfacemesh.scale.set(scale,scale,scale);
  positionwrapper.surfacemesh.position.set(positionwrapper.surfacemesh.position.x - data.dims[0] * scale / 2, positionwrapper.surfacemesh.position.y - data.dims[1] * scale / 2, positionwrapper.surfacemesh.position.z - data.dims[2] * scale / 2);
  positionwrapper.add(positionwrapper.surfacemesh);
  if(data.collisionDims && data.collision){
    var collisionData = {
      dims : data.collisionDims,
      voxels : data.collision
    }
    var collisionGeometry = makeGeometry(collisionData);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, visible : false});
    positionwrapper.collisionmesh = new THREE.Mesh( collisionGeometry, material );
    positionwrapper.collisionmesh.scale.set(scale,scale,scale);
    positionwrapper.collisionmesh.position.set(positionwrapper.collisionmesh.position.x - data.dims[0] * scale / 2, positionwrapper.collisionmesh.position.y - data.dims[1] * scale / 2, positionwrapper.collisionmesh.position.z - data.dims[2] * scale / 2);
    positionwrapper.add(positionwrapper.collisionmesh);
  }
  return positionwrapper;
}

var pixelMesh = function(scale , color, opacity){
	var geometry = new THREE.BoxGeometry( scale, scale, scale );
	color = parseInt("0x" + color);
	var material = new THREE.MeshBasicMaterial({ color: color, opacity: opacity, transparent: true });
	return new THREE.Mesh(geometry, material);
}