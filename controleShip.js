var attackSpeed = 10;
var attackDelay = attackSpeed;
var bullets = [];
var range = 100;

var createBullet = function ( position, direction ){		
	var bulletShape = new THREE.Shape();
	var bulletSizeX = 2;
	var bulletSizeY = 16;
	bulletShape.moveTo(bulletSizeX/2, bulletSizeY/2);
	bulletShape.lineTo(-bulletSizeX/2, bulletSizeY/2);
	bulletShape.lineTo(-bulletSizeX/2, -bulletSizeY/2);
	bulletShape.lineTo(bulletSizeX/2, -bulletSizeY/2);
	bulletShape.lineTo(bulletSizeX/2, bulletSizeY/2);
	var geometry = bulletShape.makeGeometry();
	var material = new THREE.MeshBasicMaterial({ color: 0x3333ff });
	var bullet = new THREE.Mesh(geometry, material);
	var innerBulletShape = new THREE.Shape();
	var innerBulletSizeX = 1
	var innerBulletSizeY = 14;
	innerBulletShape.moveTo(innerBulletSizeX/2, innerBulletSizeY/2);
	innerBulletShape.lineTo(-innerBulletSizeX/2, innerBulletSizeY/2);
	innerBulletShape.lineTo(-innerBulletSizeX/2, -innerBulletSizeY/2);
	innerBulletShape.lineTo(innerBulletSizeX/2, -innerBulletSizeY/2);
	innerBulletShape.lineTo(innerBulletSizeX/2, innerBulletSizeY/2);
	var geometry = innerBulletShape.makeGeometry();
	var material = new THREE.MeshBasicMaterial({ color: 0x6666ff });
	var innerBullet = new THREE.Mesh(geometry, material);
	bullet.rotation.z = Math.PI/2+direction.angle
	bullet.range = range;
	var offset = 10;
	bullet.position.set(position.x,position.y,position.z);
	bullet.direction = direction;
	bullet.speed = 10;
	bullets.push(bullet);
	bullet.add( innerBullet );
	scene.add( bullet );
}

var moveBullet = function ( bullets ) {
	for (i=0;i<bullets.length;i++){
		cord.moveIndirection( bullets[i].position , bullets[i].direction , bullets[i].speed );
	}
}

var shoot = function(direction){
	if (shooting){
		if (attackDelay<attackSpeed) attackDelay++;
		if (attackDelay>=attackSpeed){
			attackDelay=0;
			createBullet(playerRotationWrapper.position,direction);
		}
	}
	moveBullet(bullets);
}