var attackSpeed = 10;
var attackDelay = attackSpeed;
var bullets = [];
var range = 100;

var createBullet = function ( position, directionX, directionY, speed ){		
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
	if(0>=directionY){
		bullet.rotation.z = Math.PI/2-Math.acos((directionX-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(directionY-0,2)));
	}
	else{
		bullet.rotation.z = Math.PI/2+Math.acos((directionX-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(directionY-0,2)));
	}
	bullet.speedX = speed*(directionX-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(directionY-0,2));
	bullet.speedY = speed*(directionY-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(directionY-0,2));
	bullet.range = range;
	var offset = 10;
	bullet.position.set(position.x,position.y,position.z);
	bullet.position.y=bullet.position.y+offset*(directionX-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(-directionY-0,2));
	bullet.position.x=bullet.position.x+offset*(-directionY-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(-directionY-0,2));
	bullets.push(bullet);
	bullets.push(bullet);
	bullet.add( innerBullet );
	scene.add( bullet );
	bullets[length].position = position.x,position.y,position.z;
	bullets[length].position.y=bullets[length].position.y-offset*(directionX-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(-directionY-0,2));
	bullets[length].position.x=bullets[length].position.x-offset*(-directionY-0)/Math.sqrt(Math.pow(directionX-0,2)+Math.pow(-directionY-0,2));
	scene.add( bullets[length] );
	console.log(bullets.length);
}

var moveBullet = function ( bullets ) {
	for (i=0;i<bullets.length;i++){
		bullets[i].position.x=bullets[i].position.x+bullets[i].speedX;
		bullets[i].position.y=bullets[i].position.y+bullets[i].speedY;
	}
}

var shoot = function(){
	if (shooting){
		if (attackDelay<attackSpeed) attackDelay++;
		if (attackDelay>=attackSpeed){
			attackDelay=0;
			createBullet(playerRotationWrapper.position,mouse.x,-mouse.y,10);
		}
		//shoot(playerRotationWrapper.position);
		//console.log("shooting");
	}
	moveBullet(bullets);
}