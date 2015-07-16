function spawnEnemies(playerRotationWrapper, windowHalfX, windowHalfY){
	var maxEnemies = 3;
	var pixelTexture=THREE.ImageUtils.loadTexture('http://localhost:3000/textures/pixel.png');
	var geometry = new THREE.BoxGeometry( 29, 29, 29 );
	var material = new THREE.MeshLambertMaterial({
        transparent: true,
        color: 0x33ff33
      });
	var geometry2 = new THREE.BoxGeometry( 30, 30, 30 );
	var material2 = new THREE.MeshLambertMaterial({
        map: pixelTexture,
        transparent: true,
      });
	var enemy= new THREE.Mesh( geometry,  material );
	var outer = new THREE.Mesh( geometry2,  material2 );
	enemy.position.set(0,0,0);
	var enemy2 = new THREE.Mesh( geometry,  material );
	var outer2 = new THREE.Mesh( geometry2,  material2 );
	enemy.position.set(29,0,0);

	var enemies = [];

	for(var currentEnemies = 0; currentEnemies<maxEnemies; currentEnemies++){
		enemies[currentEnemies] = new THREE.Mesh( geometry,  material );
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