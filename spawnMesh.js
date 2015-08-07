var spawnMesh = function(data){

	var voxelScale = 5;
	var voxelArray = [];
	var materialArray = [];
	var combined = new THREE.Object3D();
	combined.dimension = [0,0,0,0,0,0];

	for(var i=0; i<data.length; i++){
		voxelArray[i] = pixelMesh(voxelScale,data[i].color);
		voxelArray[i].position.set(data[i].position[0]*voxelScale , -data[i].position[1]*voxelScale , data[i].position[2]*voxelScale );
		if (data[i].position[0]*voxelScale+voxelScale/2>combined.dimension[0]) combined.dimension[0]=data[i].position[0]*voxelScale+voxelScale/2;
		if (data[i].position[0]*voxelScale+voxelScale/2<combined.dimension[1]) combined.dimension[1]=data[i].position[0]*voxelScale+voxelScale/2;
		if (data[i].position[1]*voxelScale+voxelScale/2>combined.dimension[2]) combined.dimension[2]=data[i].position[1]*voxelScale+voxelScale/2;
		if (data[i].position[1]*voxelScale+voxelScale/2<combined.dimension[3]) combined.dimension[3]=data[i].position[1]*voxelScale+voxelScale/2;
		if (data[i].position[2]*voxelScale+voxelScale/2>combined.dimension[4]) combined.dimension[4]=data[i].position[2]*voxelScale+voxelScale/2;
		if (data[i].position[2]*voxelScale+voxelScale/2<combined.dimension[5]) combined.dimension[5]=data[i].position[2]*voxelScale+voxelScale/2;
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