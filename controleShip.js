var cord = require('cords');
var physic = require('./physic.js'); 
var flatLayer = require('./flatLayer.js');
var scene = require('./scene.js');

var bullets = [];

function _removeBullet(){
	physic.removeFromColliderList( this );
	for (i=0; i<bullets.length; i++){
		if (bullets[i].id === this.id){
			bullets.splice(i, 1);
		}
	}
	scene.remove( this );
	doDispose(this);
}

var _createBullet = function ( ship, direction ){
	var bullet = spawnMesh(ship.gun.bulletModelData);
	/*bullet.pointLight = new THREE.PointLight( 0xffffff, 1, 50 );
    bullet.pointLight.position.set( 0, 0, 0 );
    bullet.add( bullet.pointLight );*/
    accAngle = 0;
    accAngle = ((100-ship.gun.accuracy)/100)*2*Math.PI;
    var _direction = direction - accAngle/2 + Math.random()*accAngle;
	bullet.rotation.z = Math.PI/2+_direction;
	bullet.range = ship.gun.bulletRange;
	bullet.position.set(ship.position.x,ship.position.y,ship.position.z);
	bullet.direction = _direction;
	cord.moveIndirection( bullet.position , bullet.direction , (ship.shipModelData.dims[1]/2 + ship.gun.bulletModelData.dims[1]/2 + 2)*7);
	bullet.speed = 15;
	bullet.damage = ship.gun.bulletDamage;
	bullet.tag = "bullet";
	bullet.remove = _removeBullet;
	bullets.push(bullet);
	scene.add( bullet );
	physic.addToColliderList( bullet );
};

var _moveBullets = function () {
	for (i=0;i<bullets.length;i++){
		cord.moveIndirection( bullets[i].position , bullets[i].direction , bullets[i].speed );
		bullets[i].range = bullets[i].range-bullets[i].speed;
		if (bullets[i].range<=0) bullets[i].remove();
	}
};

var _shoot = function(ship,direction){
	if (ship.shoot && typeof ship.gun == 'object'){
		if (ship.attackDelay<ship.gun.attackSpeed) ship.attackDelay++;
		if (ship.attackDelay>=ship.gun.attackSpeed){
			ship.attackDelay=0;
			_createBullet(ship,direction);
			if (ship.gun.recoil){
				ship.gun.recoilSpeed=0;
				ship.gun.recoilStarted = true;
				ship.gun.recoilDiretion = direction;
			}
		}
	}
};

var _shipMovement = function(ship,direction){
	// recoil movement
	if (ship.gun && ship.gun.recoil && ship.gun.recoilStarted){
		ship.gun.recoilSpeed = physic.exponentialAcceleration(ship.gun.recoilSpeed, ship.gun.recoil ,0.6);
		if (ship.gun.recoilSpeed>=ship.gun.recoil-0.1) ship.gun.recoilStarted = false;
		//console.log(ship.gun.recoilSpeed);
	}
	if (ship.gun && ship.gun.recoil && ship.gun.recoilSpeed && !ship.gun.recoilStarted){
		//console.log(ship.gun.recoilSpeed);
		ship.gun.recoilSpeed = physic.exponentialAcceleration(ship.gun.recoilSpeed, 0 ,0.1);
		
	}
	if (ship.gun && ship.gun.recoil && ship.gun.recoilSpeed && ship.gun.recoilDiretion) cord.moveIndirection( ship.position , ship.gun.recoilDiretion+Math.PI , ship.gun.recoilSpeed );

	// move
	cord.moveIndirection( ship.position , direction , ship.speed );
	var sidewardsDirection =  direction + Math.PI/2;
	cord.moveIndirection( ship.position , sidewardsDirection , ship.sideSpeed );

	//modify speed on controles
	if( ship.moveForward ){
		ship.speed = physic.exponentialAcceleration(ship.speed, ship.engine.topspeed ,ship.engine.acceleration);
	}
	if( ship.moveBackward ){
		ship.speed = physic.exponentialAcceleration(ship.speed, -ship.engine.topspeed ,ship.engine.acceleration);
	}
	if ( !(ship.moveBackward||ship.moveForward)&&!(ship.speed===0) ){
		ship.speed = physic.exponentialAcceleration(ship.speed, 0 ,ship.engine.acceleration);
	}
	if( ship.moveLeft ){
		ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, ship.sideEngine.topspeed ,ship.sideEngine.acceleration);
	}
	if( ship.moveRight ){
		ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, -ship.sideEngine.topspeed ,ship.sideEngine.acceleration);
	}
	if ( !(ship.moveLeft||ship.moveRight)&&!(ship.sideSpeed===0) ){
		ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, 0 ,ship.sideEngine.acceleration);
	}

	//rotate
	ship.rotation.z = Math.PI/2+direction;
	if(ship.spotLightLeft){
		ship.spotLightLeft.target.position.x = ship.position.x;
    	ship.spotLightLeft.target.position.y = ship.position.y;
		ship.spotLightLeft.target.position = cord.moveIndirection( ship.spotLightLeft.target.position , direction , ship.spotLightLeft.distance );
		ship.spotLightLeft.target.updateMatrixWorld();
	}
	if(ship.spotLightRight){
		ship.spotLightRight.target.position.x = ship.position.x;
    	ship.spotLightRight.target.position.y = ship.position.y;
		ship.spotLightRight.target.position = cord.moveIndirection( ship.spotLightRight.target.position , direction , ship.spotLightLeft.distance );
		ship.spotLightRight.target.updateMatrixWorld();
	}


	//roll animation
	var maxRollRotation = Math.PI/6;
	var sideRoll = 0;
	if (ship.sideEngine.topspeed != 0) sideRoll = ship.sideSpeed*maxRollRotation/ship.sideEngine.topspeed;
	if ( sideRoll > maxRollRotation ) sideRoll = maxRollRotation;
	if ( sideRoll < -maxRollRotation ) sideRoll = -maxRollRotation;
	if(ship.shipModel){
		if(!isNaN(sideRoll)) ship.shipModel.rotation.y = sideRoll;
	}

	if(ship.updateBiome){
		ship.updateBiome();
	}
};
var _passiveRegen = function( ship ){
	if (ship.health<ship.maxHealth)	ship.health = ship.health + ship.passiveRegen;
	if (ship.health>ship.maxHealth)	ship.health = ship.maxHealth;
	flatLayer.health = ship.health;
	flatLayer.maxHealth = ship.maxHealth;
	flatLayer.redraw();
}
var _hit = function( ship ){
	var collider = physic.checkCollissionRecursive( ship.shipModel.collisionmesh );
	if(collider !== false && collider.parent){
		if (collider.parent.tag === "bullet"){
		  ship.health = ship.health - collider.parent.damage;
		  collider.parent.remove();
		  if (ship.label === "player") {
		  	flatLayer.hit();
		  	flatLayer.health = ship.health;
		  	flatLayer.maxHealth = ship.maxHealth;
		  	flatLayer.redraw();
		  }
		  if (ship.health <= 0) _die( ship ); 
		}
	}
};
var _die = function ( ship ) {
	//console.log("died");
	//physic.removeFromColliderList( ship );
	ship.remove();
};
_detectPlanet = function ( player ) {
	var planets = [];
	for (i=0; i<scene.children.length;i++){
		if (scene.children[i].planets){
			for (var p = scene.children[i].planets.length - 1; p >= 0; p--) {
				planets.push(scene.children[i].planets[p]);
			};
		}
	}

	var ray = new THREE.Raycaster( player.position, new THREE.Vector3( 0, 0, -1 ));
	var collisionResults = ray.intersectObjects( planets );
	if(collisionResults.length > 0){
		player.targetPlanet = collisionResults[0].object;
		player.pickUpDroid();
	}
	else{
		player.targetPlanet = undefined;
	}	
};
var _playerBehavior = function( mouse , player ){
	var origin={
			x : 0,
			y : 0,
			z : 0
	},
	direction = cord.direction( origin , mouse );
	_shipMovement(player,direction);
	_shoot(player,direction);
	_hit(player);
	_detectPlanet(player);
	_passiveRegen(player);
};

var _aiBehavior = function ( body , targetPosition ){
	var direction = body.rotation.z - Math.PI/2;
	_shipMovement(body,direction);
	_shoot(body,direction);
	_hit(body);
};

var shipBehavior = {
	playerBehavior : _playerBehavior,
	aiBehavior : _aiBehavior,
	moveBullets : _moveBullets
};

if (typeof(module) !== 'undefined') module.exports = shipBehavior;