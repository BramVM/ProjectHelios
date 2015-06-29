function spawnEnemies(playerRotationWrapper, windowHalfX, windowHalfY){
				console.log('playerRotationWrapper: ' + playerRotationWrapper);
				console.log('halfX: ' + windowHalfX);
				var maxEnemies = 3;
				var currentEnemies = 0;
				var geometry = new THREE.BoxGeometry( 100, 100, 100 );
				var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
				var enemy = new THREE.Mesh( geometry, material );
				if(currentEnemies <3){
					for(var i=0; i<=maxEnemies; i++){

						scene.add(enemy);

						var xPos;
						var yPos;
						var xTemp = Math.random();
						var yTemp = Math.random();

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
						enemy.position.set(xPos, yPos, 0);
						currentEnemies++;
					}
				}
			};