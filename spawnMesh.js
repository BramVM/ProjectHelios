var spawnMesh = function(data){

	var voxelScale = 5;
	var voxelArray = [];
	var materialArray = [];
	var combined = new THREE.Object3D();

	for(var i=0; i<data.length; i++){
		voxelArray[i] = pixelMesh(voxelScale,data[i].color);
		voxelArray[i].position.set(data[i].position[0]*voxelScale , -data[i].position[1]*voxelScale , data[i].position[2]*voxelScale );

		combined.add(voxelArray[i]);
	}
	return(combined);
}

var pixelMesh = function(scale , color){
	var geometry = new THREE.BoxGeometry( scale, scale, scale );
	color = parseInt("0x" + color);
	var material = new THREE.MeshLambertMaterial({ color: color });
	return new THREE.Mesh(geometry, material);
}