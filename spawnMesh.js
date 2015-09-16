var spawnMesh = function(data){

	var scale = 7;
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
        for(j=0;j<data.colors.length;j++){
          if (q[4]-1==j) {
            color = data.colors[j];
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
        var f = new THREE.Face3(q[0], q[1], q[2]);
        f.color = new THREE.Color(q[3]);
        f.vertexColors = [f.color,f.color,f.color];
        geometry.faces.push(f);
      }
    }

    geometry.computeFaceNormals();
    var material  = new THREE.MeshLambertMaterial({
      vertexColors: true
    });
    surfacemesh = new THREE.Mesh( geometry, material );
    surfacemesh.doubleSided = false;
    surfacemesh.scale.set(scale,scale,scale);
    surfacemesh.position.set(surfacemesh.position.x - data.dims[0] * scale / 2, surfacemesh.position.y - data.dims[1] * scale / 2, surfacemesh.position.z - data.dims[2] * scale / 2);
    var positionwrapper =  new THREE.Object3D();
    positionwrapper.add(surfacemesh);
    return positionwrapper;
}

var pixelMesh = function(scale , color){
	var geometry = new THREE.BoxGeometry( scale, scale, scale );
	color = parseInt("0x" + color);
	var material = new THREE.MeshLambertMaterial({ color: color });
	return new THREE.Mesh(geometry, material);
}