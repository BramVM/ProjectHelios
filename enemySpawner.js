function spawnEnemies(playerRotationWrapper, windowHalfX, windowHalfY){
	var maxEnemies = 3;
	var geometry = new THREE.BoxGeometry( 100, 100, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var enemies = [];

	for(var currentEnemies = 0; currentEnemies<maxEnemies; currentEnemies++){
		enemies[currentEnemies] = new THREE.Mesh( geometry, material );
		scene.add(enemies[currentEnemies]);
		enemies[currentEnemies].name = "enemy" + currentEnemies; 

		var xPos;
		var yPos;
		var xTemp = Math.random();
		var yTemp = Math.random();
		console.log("xTemp: " + xTemp);

		if(xTemp < 0.5){
			xPos = playerRotationWrapper.position.x - windowHalfX - 1000 + (xTemp*2000);
		}
		else{
			xPos = playerRotationWrapper.position.x + windowHalfX + (xTemp*2000);
		}
		if(yTemp < 0.5){
			yPos = playerRotationWrapper.position.y - windowHalfY - 1000 + (yTemp*2000);
		}
		else{
			yPos = playerRotationWrapper.position.y + windowHalfY + (yTemp*2000);
		}

		enemies[currentEnemies].position.set(xPos, yPos, 0);
	}
};