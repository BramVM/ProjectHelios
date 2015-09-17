(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cord = require('./cord.js');
var physic = require('./physic.js'); 

var bullets = [];

var _createBullet = function ( ship, direction ){		
	var bullet = spawnMesh(bulletVoxels);
	bullet.rotation.z = Math.PI/2+direction;
	bullet.range = ship.bulletRange;
	bullet.position.set(ship.position.x,ship.position.y,ship.position.z);
	bullet.direction = direction;
	cord.moveIndirection( bullet.position , bullet.direction , 60 );
	bullet.speed = 15;
	bullet.damage = ship.bulletDamage;
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
	bullets.splice(bullet, 1);
	physic.removeFromColliderList( bullet );
	shipBehavior.scene.remove(bullet);
	doDispose(bullet);
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
},{"./cord.js":2,"./physic.js":5}],2:[function(require,module,exports){
_direction = function ( startPosition , directionPosition ){
	var result = 0;

	if(/*directionPosition&&startPosition&&directionPosition.x&&startPosition.x&&startPosition.y&&directionPosition.y&&*/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2))!=0){
		result = Math.acos((directionPosition.x-startPosition.x)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2)));
		var sin=(directionPosition.y-startPosition.y)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2));
		if(sin<0) result = -result;
	}
	return result;
}
_moveIndirection = function ( position , direction , distance ){
	if(!isNaN(Math.cos(direction)*distance)) position.x = position.x + Math.cos(direction)*distance;
	if(!isNaN(Math.sin(direction)*distance)) position.y = position.y + Math.sin(direction)*distance;
	return position;
}
_distance = function ( position1 , position2 ){
	return Math.sqrt(Math.pow(position2.x-position1.x,2)+Math.pow(position2.y-position1.y,2));
}
var cord = {
	direction : _direction,
	moveIndirection : _moveIndirection,
	distance : _distance
}
if (typeof(module) !== 'undefined') module.exports = cord;
},{}],3:[function(require,module,exports){
var cord = require('./cord.js');
var shipBehavior = require('./controleShip.js');
var enemies = [];
function _createEnemy(location){
	var enemyIndex = enemies.length			
	enemies[enemyIndex] = new THREE.Object3D();
	enemies[enemyIndex].shipModel = new THREE.Object3D();
	enemies[enemyIndex].shipModel.add(spawnMesh(ship));
	enemies[enemyIndex].add( enemies[enemyIndex].shipModel );
	enemies[enemyIndex].position.set(location.x, location.y, location.z);
	enemyHive.scene.add( enemies[enemyIndex] );

	enemies[enemyIndex].acceleration = 0.05;
	enemies[enemyIndex].sideAcceleration = 0.05;
	enemies[enemyIndex].topspeed = 6;
	enemies[enemyIndex].topSideSpeed = 3;
	enemies[enemyIndex].attackSpeed = 20;
	enemies[enemyIndex].bulletRange = 2500;
	enemies[enemyIndex].bulletDamage = 1;
	enemies[enemyIndex].destination = location;
	enemies[enemyIndex].trajectory=0;

	enemies[enemyIndex].attackDelay = enemies[enemyIndex].attackSpeed;
	enemies[enemyIndex].speed = 0;
	enemies[enemyIndex].sideSpeed = 0;
}

function _ai(player){
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

function _spawner (playerPosition, range){
	var maxEnemies = 3;
	if (enemies.length	< maxEnemies){
		var enemyLocation = {
			x : playerPosition.x,
			y : playerPosition.y,
			z : playerPosition.z
		} 
		enemyLocation = cord.moveIndirection (enemyLocation, Math.random()*Math.PI*2, range);
		_createEnemy(enemyLocation);
	}
};

function _eraseDistantSpawns (playerPosition, range){
	for (var i = 0; i <enemies.length; i++) {
		if (cord.distance(playerPosition, enemies[i].position)>range) {
			enemyHive.scene.remove(enemies[i]);
			doDispose(enemies[i]);
			enemies.splice(i, 1);
		};
	};
}
var enemyHive = {
	ai : _ai,
	spawner : _spawner,
	eraseDistantSpawns : _eraseDistantSpawns
}

if (typeof(module) !== 'undefined') module.exports = enemyHive;
},{"./controleShip.js":1,"./cord.js":2}],4:[function(require,module,exports){
var shipBehavior = require('./controleShip.js');
var enemyHive = require('./enemyHive.js');
var worldGenerator = require('./worldGenerator.js');
var physic = require('./physic.js');

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var mouse = {
  x : 0,
  y : 0,
  down : false
},
origin={
    x : 0,
    y : 0,
    z : 0,
},
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
player = new THREE.Object3D(),
camera, scene, renderer;
player.moveForward = false;
player.moveBackward = false;
player.moveRight = false;
player.moveLeft = false;

//settings
player.maxHealth = 100;
player.health = player.maxHealth;
player.acceleration = 0.07;
player.sideAcceleration = 0.05;
player.topspeed = 7;
player.topSideSpeed = 3;
player.attackSpeed = 10;
player.bulletRange = 2500;
player.bulletDamage = 1;

//namespace variables
player.attackDelay = player.attackSpeed;
player.speed = 0;
player.sideSpeed = 0;
var collidableMeshList = [];

init();
animate();

function init() {

  var i, container;

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();

  if( Detector.webgl ){
    renderer = new THREE.WebGLRenderer({
      antialias   : true, // to get smoother output
      preserveDrawingBuffer : true  // to allow screenshot
    });
  }else{
    renderer = new THREE.CanvasRenderer();
  }
  //renderer.setClearColorHex( 0xBBBBBB, 1 );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // test area
  /*var cubeGeometry = new THREE.CubeGeometry(50,50,50,1,1,1);
  var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
  StaticCube = new THREE.Mesh( cubeGeometry, wireMaterial );
  StaticCube.position.set(0, 0, 0);
  scene.add( StaticCube );
  physic.addToColliderList( StaticCube );*/

  // player
  player.shipModel = spawnMesh(ship);
  player.add( player.shipModel );
  scene.add( player );

  // pass scene to scripts
  enemyHive.scene = scene;
  worldGenerator.scene = scene;
  shipBehavior.scene = scene;

  //world
  worldGenerator.initWorld( player.position, scene);

  //lights
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
  directionalLight.position.set( 1, -0.5, 1 );
  var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.4 );
  directionalLight2.position.set( -1, 0.5, 1 );
  scene.add( directionalLight );
  scene.add( directionalLight2 );
  var ambientLight = new THREE.AmbientLight (0x404040);
  scene.add(ambientLight);

  //cam
  camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 2500;

  // key events
  var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
        player.moveForward = true;
        break;
      case 37: // left
      case 65: // a
        player.moveLeft = true; break;
      case 40: // down
      case 83: // s
        player.moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        player.moveRight = true;
        break;
      case 32: // space
        
        break;
    }

  };

  var onKeyUp = function ( event ) {
    switch( event.keyCode ) {
      case 38: // up
      case 87: // w
        player.moveForward = false;
        break;
      case 37: // left
      case 65: // a
        player.moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        player.moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        player.moveRight = false;
        break;
    }
  };

  var onDocumentMouseDown = function ( event ) {
    //event.preventDefault();
    player.shoot = true;
  };

  var onDocumentMouseUp = function ( event ) {
    player.shoot = false;
  };

  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );

  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove(event) {

  mouse.x = event.clientX - windowHalfX;
  mouse.y = -event.clientY + windowHalfY;
}

function onDocumentTouchStart( event ) {

  if ( event.touches.length > 1 ) {

    event.preventDefault();

    mouse.x = event.touches[ 0 ].pageX - windowHalfX;
    mouse.y = -event.touches[ 0 ].pageY + windowHalfY;

  }

}

function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouse.x = event.touches[ 0 ].pageX - windowHalfX;
    mouse.y = -event.touches[ 0 ].pageY + windowHalfY;
  }

}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  shipBehavior.playerBehavior( mouse , player );
  enemyHive.ai( player );
  shipBehavior.moveBullets();
  var collider = physic.checkCollissionRecursive( player, collidableMeshList );
  if(collider !== false && collider.parent){
    if (collider.parent.name === "bullet"){
      player.health = player.health - collider.parent.damage;
      console.log(player.health <= 0 ? "dead" : collider.parent.damage); 
      shipBehavior.removeBullet(collider.parent); 
    }
  }
  setTimeout(function(){worldGenerator.updateWorldOnMove(player.position)},0);
  setTimeout(function(){enemyHive.spawner(player.position, 3200, scene)},0);
  setTimeout(function(){enemyHive.eraseDistantSpawns(player.position, 3600, scene)},0);

  //camera follow
  var camOffsetModifier = 50;
  var maxCamOffset;
  renderer.render( scene, camera );

  camera.position.x =player.position.x /*- camOffsetModifier*speedX*/;
  camera.position.y =player.position.y-500;
  camera.lookAt( player.position );
}
},{"./controleShip.js":1,"./enemyHive.js":3,"./physic.js":5,"./worldGenerator.js":6}],5:[function(require,module,exports){
_exponentialAcceleration = function ( currentSpeed, topspeed ,acceleration ){
	return currentSpeed+(topspeed-currentSpeed)*acceleration;
}
_addToColliderList = function (object){
	physic.collidableMeshList.push(object);
}
_removeFromColliderList = function (object){
	physic.collidableMeshList.splice(object,1);
}
_checkCollission = function (MovingCube){
	if (MovingCube.geometry){
		var globalPosition = new THREE.Vector3();
		globalPosition.setFromMatrixPosition( MovingCube.matrixWorld );
		var originPoint = globalPosition.clone();
		for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++)
		{		
			var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( MovingCube.matrixWorld );
			var directionVector = globalVertex.sub( globalPosition);
			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			var collisionResults = ray.intersectObjects( physic.collidableMeshList , true);
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
				return collisionResults[0].object;
		}
	}
	return false
}
_checkCollissionRecursive = function (MovingCube){
	var objects = [];
	objects.push(MovingCube);
	for ( var i = 0; i < objects.length; i ++ ) {
		var collider = _checkCollission(objects[i],physic.collidableMeshList);
		if( collider !== false ){
			return collider
		}
		if(objects[i].children.length>0){
			var children = objects[i].children; 
			for ( var k = 0, m = children.length; k < m; k ++ ) {
				objects.push(children[k]);
			}	
		}
	}
	return false
}
var physic = {
	exponentialAcceleration : _exponentialAcceleration,
	checkCollission : _checkCollission,
	checkCollissionRecursive : _checkCollissionRecursive,
	addToColliderList : _addToColliderList,
	removeFromColliderList : _removeFromColliderList,
	collidableMeshList : []
}
if (typeof(module) !== 'undefined') module.exports = physic;
},{}],6:[function(require,module,exports){
function _makeEllipsoid(l, h, f) {
    var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ]
    	, v = new Int32Array(d[0]*d[1]*d[2])
    	, n = 0;
    for(var k=l[2]; k<h[2]; ++k)
    for(var j=l[1]; j<h[1]; ++j)
    for(var i=l[0]; i<h[0]; ++i, ++n) {
    	v[n] = f(i,j,k);
    }
	return {voxels:v, dims:d};
}

function _createPlanet(radius, position, color) { 
	data = _makeEllipsoid([-(radius-1),-(radius-1),-(radius-1)], [radius,radius,radius], function(i,j,k) {
	    return i*i+j*j+k*k <= radius*radius ? 0x113344 : 0;
	});
	data = _makeEllipsoid([-(radius-1),-(radius-1),-(radius-1)], [radius,radius,radius], function(i,j,k) {
	    return ( k === 0 &&  j < radius/4 && i*i+j*j+k*k <= radius*radius && i*i+j*j+k*k >= radius*radius - 100) ? 0x113344 : 0;
	});

	var result = GreedyMesh (data.voxels, data.dims);
	var geometry = new THREE.Geometry();

	for(var i=0; i<result.vertices.length; ++i) {
		var q = result.vertices[i];
		geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
	}

	for(var i=0; i<result.faces.length; ++i) {
		var q = result.faces[i];
		if(q.length === 5) {
			var f = new THREE.Face3(q[0], q[1], q[2]);
			f.color = new THREE.Color(q[4]);
			f.vertexColors = [f.color,f.color,f.color,f.color];
			geometry.faces.push(f);
			f = new THREE.Face3(q[0], q[2], q[3]);
			geometry.faces.push(f);
		} else if(q.length == 4) {
			var f = new THREE.Face3(q[0], q[1], q[2]);
			f.color = new THREE.Color(q[3]);
			f.vertexColors = [f.color,f.color,f.color];
			geometry.faces.push(f);
		}
	}

	geometry.computeFaceNormals();

	var material = new THREE.MeshLambertMaterial({ color: color });
	surfacemesh	= new THREE.Mesh( geometry, material );
	surfacemesh.doubleSided = false;
	surfacemesh.scale.set(7,7,7);
	surfacemesh.position.set(position.x,position.y,-7*radius*4);
	return surfacemesh;
}

var _createStar = function(radius,position,color){
	var circle = new THREE.Shape();
	for (var i = 0; i < 4; i++) {
	  var pct = (i + 1) / 4;
	  var theta = pct * Math.PI * 2.0;
	  var x = radius * Math.cos(theta);
	  var y = radius * Math.sin(theta);
	  if (i == 0) {
	    circle.moveTo(x, y);
	  } else {
	    circle.lineTo(x, y);
	  }
	}
	var geometry = circle.makeGeometry();
	var material = new THREE.MeshBasicMaterial({ color: color });
	var star = new THREE.Mesh(geometry, material);

	star.position.set(position.x,position.y,position.z);
	return star;
}
function _seed(x,y){
	var i=x+y;
	var k=x-y;
	var frequency=20;
	var amplitude=1;
	var result=0;
	result=amplitude*Math.sin(i*frequency);
	result=result+amplitude*Math.sin(k*frequency);
	return result;
}
var gridSize = {
	x:1500,
	y:1500
} ;
var gridMatrixSize = 1;
var tiles = [];
var prevTilePos;

var _setGridSize = function (gridMatrixSize,gridSize) {

}

var _checkNearestTile = function (position){
	var nearestTilePosition = {};
	nearestTilePosition.x = gridSize.x * Math.round(position.x/gridSize.x);
	nearestTilePosition.y = gridSize.y * Math.round(position.y/gridSize.y);
	return nearestTilePosition;
}
var _initWorld = function (position){
	prevTilePos = _checkNearestTile(position);
	_generateWorld (prevTilePos,true);
}
var _updateWorldOnMove = function (position){
	if (_checkNearestTile(position).x!=prevTilePos.x||_checkNearestTile(position).y!=prevTilePos.y){
		prevTilePos = _checkNearestTile(position);
		//assynchrone
		_generateWorld (prevTilePos,false);
	}
}
var _generateWorld = function (nearestTilePosition,init){
	for ( l = 0 ; l < tiles.length ; l++ ) {
		tiles[l].stay = false;
	}
	var pseudoPosition = {};
	for(j=-gridMatrixSize;j<=gridMatrixSize;j++){
		pseudoPosition.y = nearestTilePosition.y-j*gridSize.y;
		for(i=-gridMatrixSize;i<=gridMatrixSize;i++){
			pseudoPosition.x = nearestTilePosition.x-i*gridSize.x;
			//check if already in tiles
			var inArray=false;
			for ( l = 0 ; l < tiles.length ; l++ ){
				if(tiles[l].gridPosX===pseudoPosition.x/gridSize.x && tiles[l].gridPosY===pseudoPosition.y/gridSize.y){
					tiles[l].stay=true;
					inArray=true;
				}
			}
			if (!inArray){
				_generateTile(pseudoPosition);
			} 
		}
	}
	for ( l = 0 ; l < tiles.length ; l++ ){	
		if (!tiles[l].stay){
			worldGenerator.scene.remove(tiles[l]);
			doDispose(tiles[l]);
			tiles.splice(l, 1);
		}
	}
}

var _generateTile = function(position){
	var tileIndex = tiles.length;
	tiles[ tileIndex] = new THREE.Object3D();
	tiles[ tileIndex].stay=true;
	tiles[ tileIndex].stars = [];
	tiles[ tileIndex].planets = [];
	tiles[ tileIndex].gridPosX = position.x/gridSize.x;
	tiles[ tileIndex].gridPosY = position.y/gridSize.y;

	/*var square = new THREE.Shape();
    square.moveTo(-gridSize.x/2+5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, -gridSize.y/2+5);

	var geometry = square.makeGeometry();
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.3});
	var square = new THREE.Mesh(geometry, material);
	square.position.set(position.x,position.y,-500);
	var wireframe = new THREE.WireframeHelper( square, 0xffffff );
	
	tiles[ tileIndex ].stars.push(square);
	tiles[ tileIndex ].stars.push(wireframe);*/

	var indexX = position.x - gridSize.x/2;
	var indexY = position.y - gridSize.y/2;

	//stars
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + Math.abs(_seed(indexX,0))*100+75 ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + Math.abs(_seed(indexY,0)*100)+75 ) {
	 		var radius=0;
	 		if(indexX+indexY!=0){
	 			var radiusGenerator = _SeedRandom(Math.pow(_seed(indexX,indexY),2));
	 			radius = radiusGenerator(6);
	 		}
	 		if (radius && radius!=0){
	 			var rngPositionX = _SeedRandom(Math.abs(indexX+indexY));
	 			var rngPositionY = _SeedRandom(Math.abs(indexY-indexX));
	 			var rngColor = _SeedRandom(Math.abs(indexX-indexY));
	 			var starPosition = {
	 				x : indexX + rngPositionX(500) - 250,
	 				y : indexY + rngPositionY(500) - 250,
	 				z : -500
	 			}
	 			var red = 255;
	 			var green = 255;
	 			var blue = 220;
	 			if(rngColor(100)>80){
	 				var red = Math.round(255-rngPositionX(100));
	 				var green =Math.round( 250-rngPositionX(100)-rngPositionY(100));
	 				var blue = Math.round( 255-rngPositionY(100));
	 			}
	 			var color ="rgb("+red+","+green+","+blue+")";
	 			tiles[ tileIndex ].stars.push(_createStar (radius,starPosition,color));
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	//planets

	indexX = position.x - gridSize.x/2;
	indexY = position.y - gridSize.y/2;

	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + Math.abs(_seed(indexX,0))*2000+1500 ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + Math.abs(_seed(indexY,0)*2000)+1500 ) {
	 		var radius=0;
	 		if(indexX+indexY!=0){
	 			var radiusGenerator = _SeedRandom(Math.pow(_seed(indexX,indexY),2));
	 			var existanceGenerator = _SeedRandom(Math.abs(indexX*indexY));
	 			radius = 5 + Math.round(radiusGenerator(15));
	 			if (radius && radius!=0 && existanceGenerator(100)>90){
		 			var rngPositionX = _SeedRandom(Math.abs(indexX+indexY));
		 			var rngPositionY = _SeedRandom(Math.abs(indexY-indexX));
		 			var rngColor = _SeedRandom(Math.abs(indexX-indexY));
		 			var planetPosition = {
		 				x : indexX + rngPositionX(500) - 250,
		 				y : indexY + rngPositionY(500) - 250,
		 				z : -500
		 			}
		 			var red = 255;
		 			var green = 255;
		 			var blue = 220;
		 			var red = Math.round(rngPositionX(255));
		 			var green =Math.round( rngColor(255));
		 			var blue = Math.round( rngPositionY(255));
		 			var color ="rgb("+red+","+green+","+blue+")";
		 			tiles[ tileIndex ].planets.push(_createPlanet (radius,planetPosition,color));
	 			}
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	//add all objects to the scene
	worldGenerator.scene.add(tiles[tileIndex]);
	for ( k = 0 ; k < tiles[tileIndex].stars.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].stars[k]);
	}
	for ( k = 0 ; k < tiles[tileIndex].planets.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].planets[k]);
	}
}

function _SeedRandom(state1,state2){
    var mod1=4294967087
    var mul1=65539
    var mod2=4294965887
    var mul2=65537
    if(typeof state1!="number"){
        state1=+new Date()
    }
    if(typeof state2!="number"){
        state2=state1
    }
    state1=state1%(mod1-1)+1
    state2=state2%(mod2-1)+1
    function random(limit){
        state1=(state1*mul1)%mod1
        state2=(state2*mul2)%mod2
        if(state1<limit && state2<limit && state1<mod1%limit && state2<mod2%limit){
            return random(limit)
        }
        return (state1+state2)%limit
    }
    return random
}

var worldGenerator = {
	updateWorldOnMove : _updateWorldOnMove,
	initWorld : _initWorld,
	setGridSize : _setGridSize
}

if (typeof(module) !== 'undefined') module.exports = worldGenerator;
},{}]},{},[4]);
