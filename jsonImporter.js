var spawnMesh = function(voxels){
	var voxelScale = 30;

	var geometry = new THREE.BoxGeometry( voxelScale, voxelScale, voxelScale );
	var material = new THREE.MeshLambertMaterial();

	var voxelArray = [];

	var combined = new THREE.Geometry();

	for(var i=0; i<voxels.length; i++){
		voxelArray[i] = new THREE.Mesh(geometry, material);
		voxelArray[i].position.set(voxels[i].position[0]*voxelScale , voxels[i].position[1]*voxelScale , 0);

		THREE.GeometryUtils.merge( combined, voxelArray[i] );
	}

	var mesh = new THREE.Mesh( combined );
	return(mesh);
}