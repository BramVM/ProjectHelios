var shipBehavior = require('./controleShip.js');
var enemyHive = require('./enemyHive.js');
var worldGenerator = require('./worldGenerator.js');
var physic = require('./physic.js');
var textLayer = require('./textLayer.js');

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
player.remove = function(){
  console.log("player died");
  this.position.x = 0;
  this.position.y = 0;
  this.position.z = 0;
  this.health = this.maxHealth;
};
player.health = player.maxHealth;
player.acceleration = 0.07;
player.sideAcceleration = 0.05;
player.topspeed = 7;
player.topSideSpeed = 3;
player.attackSpeed = 10;
player.bulletRange = 2500;
player.bulletDamage = 20;
player.label = "player";

//namespace variables
player.attackDelay = player.attackSpeed;
player.speed = 0;
player.sideSpeed = 0;

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
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // player
  player.shipModel = spawnMesh(ship);
  player.add( player.shipModel );
  scene.add( player );
  textLayer.health = player.health;
  //textLayer.maxHealth = player.maxHealth;
  //textLayer.redraw();
  //physic.collidableMeshList.push(player.shipModel.collisionmesh);

  // pass scene to modules
  enemyHive.scene = scene;
  worldGenerator.scene = scene;
  shipBehavior.scene = scene;

  //world
  worldGenerator.initWorld( player.position);

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
  textLayer.resize();
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