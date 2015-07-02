var spawnMesh = function(mainShip){

	var voxelScale = 30;
	var geometry = new THREE.BoxGeometry( voxelScale, voxelScale, voxelScale );
	var voxelArray = [];
	var materialArray = [];
	var combined = new THREE.Object3D();

	for(var i=0; i<mainShip.length; i++){

		var curColor = parseInt("0x" + mainShip[i].color);
		materialArray[i] = new THREE.MeshLambertMaterial({ color: curColor });

		voxelArray[i] = new THREE.Mesh(geometry, materialArray[i]);
		voxelArray[i].position.set(voxels[i].position[0]*voxelScale , voxels[i].position[1]*voxelScale , voxels[i].position[2]*voxelScale );

		combined.add(voxelArray[i]);
	}
	return(combined);
}