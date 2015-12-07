var cord = require('cords');
var scene = require('./scene.js');
var shipBehavior = require('./controleShip.js');
var model = require('./models/mainShip1.js');
var seeder = require('./seeder');
var enemyData = require('./enemies');

var enemies = [];

function removeAi(){
	scene.remove(this);
	doDispose(this);
	for (i=0; i<enemies.length; i++){
		if (enemies[i].id === this.id){
			enemies.splice(i, 1);
		}
	}
}

function _createEnemy(location){
	var enemyIndex = enemies.length;
	var biomeObj = seeder.seedBiome(location.x,location.y);
	//determen ship
	if(!biomeObj.biome.calculateEnemy){
		biomeObj.biome.calculateEnemy = (function () {
		    var total = 0;
			for (b=0; b<biomeObj.biome.enemies.length; b++){
				total=total+biomeObj.biome.enemies[b].presence;
			}
			var presence = [];
			if (total>0){
				for (b=0; b<biomeObj.biome.enemies.length; b++){
					presence[b] = biomeObj.biome.enemies[b].presence/total;
				}
			}
		    return function (rng) {
		    	var a = 0;
		    	for (b=0; b<presence.length; b++){
		    		if (rng<presence[b]+a){
		    			return biomeObj.biome.enemies[b];
		    		}
		    		a=a+presence[b];
		    	}
		    };
		})();
	}
	var calculatedEnemy = biomeObj.biome.calculateEnemy(Math.random());
	if(calculatedEnemy && calculatedEnemy.label){
		for (var ii = 0; ii < enemyData.length; ii++) {
			if (calculatedEnemy.label === enemyData[ii].label){

				enemies[enemyIndex] = new THREE.Object3D();
				enemies[enemyIndex].originBiomeId = biomeObj.id;
				enemies[enemyIndex].biomeId = biomeObj.id;
				enemies[enemyIndex].biome = biomeObj.biome;
				enemies[enemyIndex].biomeIntensity = biomeObj.biomeIntensity;
				enemies[enemyIndex].biomeMid = biomeObj.mid;

				enemies[enemyIndex].shipModelData = enemyData[ii].model;
				enemies[enemyIndex].shipModel = spawnMesh(enemyData[ii].model);
				enemies[enemyIndex].add( enemies[enemyIndex].shipModel );
				enemies[enemyIndex].position.set(location.x, location.y, location.z);
				scene.add( enemies[enemyIndex] );

				enemies[enemyIndex].tag = "ai";
				enemies[enemyIndex].engine = enemyData[ii].engine;
				enemies[enemyIndex].sideEngine = enemyData[ii].sideEngine;
				enemies[enemyIndex].attackSpeed = enemyData[ii].attackSpeed;
				enemies[enemyIndex].bulletRange = enemyData[ii].bulletRange;
				enemies[enemyIndex].bulletDamage = enemyData[ii].bulletDamage;
				enemies[enemyIndex].bulletModelData = enemyData[ii].bulletModel;
				enemies[enemyIndex].recoil = enemyData[ii].recoil;
				enemies[enemyIndex].health = enemyData[ii].health;
				enemies[enemyIndex].remove = removeAi;

				enemies[enemyIndex].destination = location;
				enemies[enemyIndex].trajectory=0;

				enemies[enemyIndex].attackDelay = enemies[enemyIndex].attackSpeed;
				enemies[enemyIndex].speed = 0;
				enemies[enemyIndex].sideSpeed = 0;

				enemies[enemyIndex].updateBiome = function(){
				  var biomeObj = seeder.seedBiome(this.position.x, this.position.y);
				  this.biomeIntensity = biomeObj.biomeIntensity;
				  this.biomeId = biomeObj.id;
				}
			}
		};
	}
}

function _ai(player){
	for(i = 0; i<enemies.length; i++){
		var detectionRange = 1000;
		var approachRange = 500;
		var backOffRange = 300;
		var shootingRange = 750;
		var range = cord.distance(enemies[i].position,player.position);
		var maneuverability = 0.05; 
		enemies[i].moveForward = true;
		enemies[i].moveBackward = false;
		enemies[i].shoot = false;
		if (range<detectionRange) enemies[i].detectedTarget = true;
		else enemies[i].detectedTarget = false;
		if (enemies[i].detectedTarget === true) {
			if (range<approachRange) enemies[i].moveForward = false;
			if (range<backOffRange) enemies[i].moveBackward = true;
			if (range<shootingRange) enemies[i].shoot = true;
			var direction = cord.direction ( enemies[i].position, player.position );
			var deviation = (Math.PI/2+direction - enemies[i].rotation.z);
			if(deviation>2*Math.PI) deviation = deviation - 2*Math.PI;
			if(deviation>Math.PI) deviation = - (2*Math.PI - deviation);
			//ease rotation
			if(deviation>maneuverability) deviation = maneuverability;
			if(deviation<-maneuverability) deviation = -maneuverability;
			enemies[i].rotation.z = enemies[i].rotation.z + deviation;
		}
		else{
			if(enemies[i].biomeIntensity<0.5 || enemies[i].originBiomeId != enemies[i].biomeId){
				direction = cord.direction ( enemies[i].position, enemies[i].biomeMid );
				var deviation = (Math.PI/2+direction - enemies[i].rotation.z);
				if(deviation>2*Math.PI) deviation = deviation - 2*Math.PI;
				if(deviation>Math.PI) deviation = - (2*Math.PI - deviation);
				//ease rotation
				if(deviation>maneuverability) deviation = maneuverability;
				if(deviation<-maneuverability) deviation = -maneuverability;
				enemies[i].rotation.z = enemies[i].rotation.z + deviation;
			}
			enemies[i].rotation.z = enemies[i].rotation.z - 0.025 + Math.random()*0.05
		}
		shipBehavior.aiBehavior ( enemies[i] , enemies[i].destination );
	}
}

function _spawner (playerPosition, range){
	var maxEnemies = 3;
	if (enemies.length	< maxEnemies){
		var enemyLocation = {
			x : playerPosition.x,
			y : playerPosition.y,
			z : playerPosition.z
		};
		enemyLocation = cord.moveIndirection (enemyLocation, Math.random()*Math.PI*2, range);
		_createEnemy(enemyLocation);
	}
}

function _eraseDistantSpawns (playerPosition, range){
	for (var i = 0; i <enemies.length; i++) {
		if (cord.distance(playerPosition, enemies[i].position)>range) {
			enemies[i].remove();
		}
	}
}
var enemyHive = {
	ai : _ai,
	spawner : _spawner,
	eraseDistantSpawns : _eraseDistantSpawns
};

if (typeof(module) !== 'undefined') module.exports = enemyHive;