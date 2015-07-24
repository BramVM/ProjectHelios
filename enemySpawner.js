var enemies = [];
function createEnemy(location){
	var enemyIndex = enemies.length			
	enemies[enemyIndex] = new THREE.Object3D();
	enemies[enemyIndex].shipModel = new THREE.Object3D();
	enemies[enemyIndex].shipModel.add(spawnMesh(ship));
	enemies[enemyIndex].add( enemies[enemyIndex].shipModel );
	enemies[enemyIndex].position.set(location.x, location.y, location.z);
	console.log(enemies[enemyIndex].position);
	scene.add( enemies[enemyIndex] );

	enemies[enemyIndex].acceleration = 0.05;
	enemies[enemyIndex].sideAcceleration = 0.05;
	enemies[enemyIndex].topspeed = 6;
	enemies[enemyIndex].topSideSpeed = 3;
	enemies[enemyIndex].attackSpeed = 20;
	enemies[enemyIndex].bulletRange = 2500;
	enemies[enemyIndex].destination = location;
	enemies[enemyIndex].trajectory=0;

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
		enemies[i].moveForward = true;
		enemies[i].moveBackward = false;
		enemies[i].shoot = false;
		if (range<detectionRange) enemies[i].detectedTarget = true;
		else enemies[i].detectedTarget = false;
		if (enemies[i].detectedTarget === true) {
			if (range<approachRange) enemies[i].moveForward = false;
			if (range<backOffRange) enemies[i].moveBackward = true;
			if (range<shootingRange) enemies[i].shoot = true;
			var direction = cord.direction ( enemies[i].destination, player.position )
			enemies[i].destination = cord.moveIndirection( enemies[i].destination , direction , 7);
		}
		else{
			enemies[i].trajectory = enemies[i].trajectory + Math.PI/32-(Math.random()*Math.PI/16)
			enemies[i].destination = cord.moveIndirection( enemies[i].destination , enemies[i].trajectory , enemies[i].topspeed);
		}
		shipBehavior.aiBehavior ( enemies[i] , enemies[i].destination );
	}
}

function enemiesSpawner (playerPosition, range){
	var maxEnemies = 3;
	if (enemies.length	< maxEnemies){
		var enemyLocation = {
			x : playerPosition.x,
			y : playerPosition.y,
			z : playerPosition.z
		} 
		enemyLocation = cord.moveIndirection (enemyLocation, Math.random()*Math.PI*2, range);
		createEnemy(enemyLocation);
	}
};

function eraseDistantEnemies (playerPosition, range){
	for (var i = 0; i <enemies.length; i++) {
		if (cord.distance(playerPosition, enemies[i].position)>range) {
			scene.remove(enemies[i]);
			doDispose(enemies[i]);
			enemies.splice(i, 1);
		};
	};
}