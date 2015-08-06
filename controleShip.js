var cord = require('./cord.js');
var physic = require('./physic.js'); 

var bullets = [];

var _createBullet = function ( ship, direction ){		
	var bullet = spawnMesh(bulletVoxels);
	bullet.rotation.z = Math.PI/2+direction;
	bullet.range = ship.bulletRange;
	bullet.position.set(ship.position.x,ship.position.y,ship.position.z);
	bullet.direction = direction;
	bullet.speed = 15;
	bullet.name = "bullet";
	bullets.push(bullet);
	shipBehavior.scene.add( bullet );
	physic.addToColliderList( bullet );
}
var _moveBullets = function () {
	for (i=0;i<bullets.length;i++){
		cord.moveIndirection( bullets[i].position , bullets[i].direction , bullets[i].speed );
		bullets[i].range = bullets[i].range-bullets[i].speed;
		if (bullets[i].range<=0) {
			_removeBullet(bullets[i]);
		}
	}
}
var _removeBullet = function (bullet){
	shipBehavior.scene.remove(bullet);
	doDispose(bullet);
	bullets.splice(bullet, 1);
	physic.removeFromColliderList( bullet );
}

var _shoot = function(ship,direction){
	if (ship.shoot){
		if (ship.attackDelay<ship.attackSpeed) ship.attackDelay++;
		if (ship.attackDelay>=ship.attackSpeed){
			ship.attackDelay=0;
			_createBullet(ship,direction);
		}
	}
}
var _shipMovement = function(ship,direction){
	//if(!(0===mouse.x&&0===-mouse.y)){
		// move
		cord.moveIndirection( ship.position , direction , ship.speed );
		var sidewardsDirection =  direction + Math.PI/2;
		cord.moveIndirection( ship.position , sidewardsDirection , ship.sideSpeed );

		//modify speed on controles
		if( ship.moveForward ){
			ship.speed = physic.exponentialAcceleration(ship.speed, ship.topspeed ,ship.acceleration);
		}
		if( ship.moveBackward ){
			ship.speed = physic.exponentialAcceleration(ship.speed, -ship.topspeed ,ship.acceleration);
		}
		if ( !(ship.moveBackward||ship.moveForward)&&!(ship.speed==0) ){
			ship.speed = physic.exponentialAcceleration(ship.speed, 0 ,ship.acceleration);
		}
		if( ship.moveLeft ){
			ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, ship.topSideSpeed ,ship.sideAcceleration);
		}
		if( ship.moveRight ){
			ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, -ship.topSideSpeed ,ship.sideAcceleration);
		}
		if ( !(ship.moveLeft||ship.moveRight)&&!(ship.sideSpeed==0) ){
			ship.sideSpeed = physic.exponentialAcceleration(ship.sideSpeed, 0 ,ship.sideAcceleration);
		}

		//rotate
		ship.rotation.z = Math.PI/2+direction;
	//}
	//roll animation
	var maxRollRotation = Math.PI/6;
	var sideRoll = ship.sideSpeed*maxRollRotation/ship.topSideSpeed;
	if ( sideRoll > maxRollRotation ) sideRoll = maxRollRotation;
	if ( sideRoll < -maxRollRotation ) sideRoll = -maxRollRotation;
	if(ship.shipModel){
		if(!isNaN(sideRoll)) ship.shipModel.rotation.y = sideRoll;
	}
}

var _playerBehavior = function( mouse , player ){
	var origin={
			x : 0,
			y : 0,
			z : 0,
	},
	direction = cord.direction( origin , mouse );
	_shipMovement(player,direction);
	_shoot(player,direction);
}

var _aiBehavior = function ( body , targetPosition ){
	var direction = cord.direction( body.position , targetPosition );
	_shipMovement(body,direction);
	_shoot(body,direction);
}

var shipBehavior = {
	playerBehavior : _playerBehavior,
	aiBehavior : _aiBehavior,
	moveBullets : _moveBullets,
	removeBullet : _removeBullet
}

if (typeof(module) !== 'undefined') module.exports = shipBehavior;