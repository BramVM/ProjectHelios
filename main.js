mainModule.controller('mainController', ['$scope', function($scope) {
  var shipBehavior = require('./controleShip.js');
  var enemyHive = require('./enemyHive.js');
  var worldGenerator = require('./worldGenerator.js');
  var physic = require('./physic.js');
  var player = require('./player.js');
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
      z : 0
  },
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,

  camera, scene, renderer;


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
    scene.add( player );
    textLayer.health = player.health;

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
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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

    camera.position.x = player.position.x /*- camOffsetModifier*speedX*/;
    camera.position.y = player.position.y-500;
    camera.lookAt( player.position );
    // update interface
    updateInterface();
    textLayer.camera = camera;
    textLayer.redraw();
  }
  
  function updateInterface (){  
    if(!$scope.$$phase) {
      $scope.$apply(function(){
        $scope.collect = function(droid){
          droid.collect($scope.wantedItem);
          $scope.listAvailableDroids = player.listAvailableDroids($scope.wantedItem);
        }
        $scope.selectItem = function(item) {
          $scope.showDroidlist = true;
          $scope.wantedItem = item;
          $scope.listAvailableDroids = player.listAvailableDroids(item);
        }
        $scope.engine = player.engine;
        $scope.items = player.items;
        $scope.miningDroids = player.miningDroids;
        player.targetPlanet && player.targetPlanet.items ? $scope.planetItems = player.targetPlanet.items :  $scope.planetItems = [];
        if (player.targetPlanet){
          $scope.showPlanet = true;
        }
        else{
          $scope.showPlanet = false;
          $scope.showDroidlist = false;
          $scope.wantedItem = undefined;
        }
      });
    }
  }
}]);
