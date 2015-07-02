var attackSpeed = 10;
var attackDelay = attackSpeed;
var bullets = [];
var range = 100;

var createBullet = function ( position, direction ){		
	var bullet = spawnMesh(bulletVoxels);
	bullet.rotation.z = Math.PI/2+direction.angle
	bullet.range = range;
	var offset = 10;
	bullet.position.set(position.x,position.y,position.z);
	bullet.direction = direction;
	bullet.speed = 10;
	bullets.push(bullet);
	scene.add( bullet );
}

var moveBullet = function ( bullets ) {
	for (i=0;i<bullets.length;i++){
		cord.moveIndirection( bullets[i].position , bullets[i].direction , bullets[i].speed );
	}
}

var shoot = function(direction){
	if (mouse.down){
		if (attackDelay<attackSpeed) attackDelay++;
		if (attackDelay>=attackSpeed){
			attackDelay=0;
			createBullet(playerRotationWrapper.position,direction);
		}
	}
	moveBullet(bullets);
}
var shipMovement = function(direction){
	var mainSpaceship = scene.getObjectByName( "mainSpaceship" );
	if(!(0===mouse.x&&0===-mouse.y)){
		var midscreen = {
			x : 0,
			y : 0,
			z : 0
		}
		// move
		cord.moveIndirection( playerRotationWrapper.position , direction , speed );
		var sidewardsDirection = {
			angle : direction.angle + Math.PI/2
		}
		cord.moveIndirection( playerRotationWrapper.position , sidewardsDirection , sideSpeed );

		//modify speed on controles
		if( keys.moveForward ){
			speed = physic.exponentialAcceleration(speed, topspeed ,acceleration);
		}
		if( keys.moveBackward ){
			speed = physic.exponentialAcceleration(speed, -topspeed ,acceleration);
		}
		if ( !(keys.moveBackward||keys.moveForward)&&!(speed==0) ){
			speed = physic.exponentialAcceleration(speed, 0 ,acceleration);
		}
		if( keys.moveLeft ){
			sideSpeed = physic.exponentialAcceleration(sideSpeed, topSideSpeed ,sideAcceleration);
		}
		if( keys.moveRight ){
			sideSpeed = physic.exponentialAcceleration(sideSpeed, -topSideSpeed ,sideAcceleration);
		}
		if ( !(keys.moveLeft||keys.moveRight)&&!(sideSpeed==0) ){
			sideSpeed = physic.exponentialAcceleration(sideSpeed, 0 ,sideAcceleration);
		}

		//rotate
		playerRotationWrapper.rotation.z = Math.PI/2+direction.angle;
	}
	//roll animation
	var maxRollRotation = Math.PI/6;
	var sideRoll = sideSpeed*maxRollRotation/topSideSpeed;
	if ( sideRoll > maxRollRotation ) sideRoll = maxRollRotation;
	if ( sideRoll < -maxRollRotation ) sideRoll = -maxRollRotation;
	if(mainSpaceship){
		mainSpaceship.rotation.y = sideRoll;
	}
}
var controleShip = function(){
	var direction = cord.direction( origin , mouse );
	shipMovement(direction);
	shoot(direction);
}
