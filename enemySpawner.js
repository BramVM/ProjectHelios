var enemies = [];
function spawnEnemy(location){
	var enemyIndex = enemies.length			
	enemies[enemyIndex] = new THREE.Object3D();
	enemies[enemyIndex].shipModel = new THREE.Object3D();
	enemies[enemyIndex].shipModel.add(spawnMesh(ship));
	enemies[enemyIndex].add( enemies[enemyIndex].shipModel );
	scene.add( enemies[enemyIndex] );

	enemies[enemyIndex].acceleration = 0.05;
	enemies[enemyIndex].sideAcceleration = 0.05;
	enemies[enemyIndex].topspeed = 6;
	enemies[enemyIndex].topSideSpeed = 3;
	enemies[enemyIndex].attackSpeed = 20;
	enemies[enemyIndex].bulletRange = 2500;

	enemies[enemyIndex].attackDelay = enemies[enemyIndex].attackSpeed;
	enemies[enemyIndex].speed = 0;
	enemies[enemyIndex].sideSpeed = 0;
}

function enemyAi(player){
	for(i = 0; i<enemies.length; i++){
		var detectionRange = 1000;
		var approachRange = 500;
		var backOffRange = 300;
		var shootingRange = 750;
		var range = cord.distance(enemies[i].position,player.position);
		enemies[i].moveForward = false;
		enemies[i].moveBackward = false;
		enemies[i].shoot = false;
		if (range<detectionRange && range>approachRange) enemies[i].moveForward = true;
		if (range<backOffRange) enemies[i].moveBackward = true;
		if (range<shootingRange) enemies[i].shoot = true;
		shipBehavior.aiBehavior ( enemies[i] , player );
	}
}

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