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
player.acceleration = 0.07;
player.sideAcceleration = 0.05;
player.topspeed = 7;
player.topSideSpeed = 3;
player.attackSpeed = 10;
player.bulletRange = 2500;

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

                var compileMesher = require("greedy-mesher")

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
                data.dims=[15,15,4];
                data.voxels=[

                1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
                1,1,0,0,2,2,0,1,0,2,2,0,0,1,1,
                1,1,1,0,2,2,0,1,0,2,2,0,1,1,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,
                1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,
                2,0,0,1,1,1,1,1,1,1,1,1,0,0,2,
                2,0,0,1,1,1,1,1,1,1,1,1,0,0,2,
                0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,
                0,0,0,2,0,0,1,1,1,0,0,2,0,0,0,
                0,0,0,2,0,0,1,1,1,0,0,2,0,0,0,
                0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,

                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,2,0,1,0,2,0,0,0,0,0,
                0,0,0,0,0,2,0,1,0,2,0,0,0,0,0,
                0,1,1,1,1,2,1,1,1,2,1,1,1,1,0,
                0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,
                0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,
                0,0,0,3,1,1,1,1,1,1,1,3,0,0,0,
                0,0,0,0,3,1,1,1,1,1,3,0,0,0,0,
                0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,
                0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,
                0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
                0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

                0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                
                ];
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

                var material  = new THREE.MeshBasicMaterial({
                  vertexColors: true
                });
                surfacemesh = new THREE.Mesh( geometry, material );
                surfacemesh.doubleSided = false;
                surfacemesh.scale.set(7,7,7);
                surfacemesh.position.set(position.x,position.y,-7*radius*4);
                var wireframe = new THREE.WireframeHelper( surfacemesh, 0xffffff );
                wireframe.doubleSided = false;
                wireframe.scale.set(7,7,7);
                wireframe.position.set(position.x,position.y,-7*radius*4);
                return wireframe;
              }
              var red = 255;
              var green = 255;
              var blue = 220;
              var color ="rgb("+red+","+green+","+blue+")";
              scene.add(_createPlanet ( 11 ,origin , color));

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
  camera.position.z = 100;

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
  camera.position.y =player.position.y-1;
  camera.lookAt( player.position );
}