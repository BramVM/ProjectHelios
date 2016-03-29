mainModule.controller('mainController', ['$scope', function($scope) {
  var shipBehavior = require('./controleShip.js');
  var enemyHive = require('./enemyHive.js');
  var worldGenerator = require('./worldGenerator.js');
  var physic = require('./physic.js');
  var player = require('./player.js');
  var flatLayer = require('./flatLayer.js');
  var scene = require('./scene.js');
  var voxelEffects = require('./voxelEffects.js');
  var lighting = require('./lighting.js');
  var itemDb = require('./items.js');
  var _ = require('underscore');
  
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

  camera, renderer;

  //namespace variables
  player.attackDelay = player.gun.attackSpeed;
  player.speed = 0;
  player.sideSpeed = 0;
  init();
  animate();

  function init() {

    var i, container;

    container = document.createElement( 'div' );
    document.body.appendChild( container );

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


    //spotLightLeft.castShadow = true;

  /*spotLightLeft.shadowMapWidth = 1024;
  spotLightLeft.shadowMapHeight = 1024;

  spotLightLeft.shadowCameraNear = 500;
  spotLightLeft.shadowCameraFar = 4000;
  spotLightLeft.shadowCameraFov = 30;*/
    player.spotLightLeft = new THREE.SpotLight( 0xffffff);
    player.spotLightLeft.position.set( 0, 0, 100 );
    player.spotLightLeft.distance = 1000;
    player.spotLightLeft.target.position.set( 0, 0, 0);
    player.spotLightLeft.position.y=0;
    player.spotLightLeft.position.x=7*3;
    player.spotLightLeft.angle = Math.PI/2.5;
    player.add( player.spotLightLeft );
    player.spotLightLeft.shadowMapVisible = true;

    player.pointLightLeft = new THREE.PointLight( 0xffffff, 1, 50 );
    player.pointLightLeft.position.set( 7*3, -7*9, 7 );
    player.shipModel.add( player.pointLightLeft );

    player.spotLightRight = new THREE.SpotLight( 0xffffff);
    player.spotLightRight.position.set( 0, 0, 100 );
    player.spotLightRight.target.position.set( 0, 0, 0);
    player.spotLightRight.position.y=0;
    player.spotLightRight.position.x=-7*3;
    player.spotLightRight.angle = Math.PI/2.5;
    player.add( player.spotLightRight );
    player.spotLightRight.shadowMapVisible = true;

    player.pointLighRight = new THREE.PointLight( 0xffffff, 1, 50 );
    player.pointLighRight.position.set( -7*3, -7*9, 7 );
    player.shipModel.add( player.pointLighRight );

    var thruster1=voxelEffects.thruster(1,3,player.speed,player.engine.topspeed);
    thruster1.position.y=+7*8;
    thruster1.position.x=+7;
    var thruster2=voxelEffects.thruster(1,3,player.speed,player.engine.topspeed);
    thruster2.position.y=+7*8;
    thruster2.position.x=-7;
    player.shipModel.add(thruster1 );
    player.shipModel.add(thruster2 );
    scene.add( player );
    flatLayer.health = player.health;

    //world
    worldGenerator.initWorld( player.position);

    //cam
    camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2500;
    console.log(renderer.info);
    
  }
  function onWindowResize() {
    flatLayer.resize();
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
    voxelEffects.animateThruster();
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
    flatLayer.camera = camera;
    flatLayer.redraw();
    //set lighting
    lighting.updateLighting(player.position.x, player.position.y);
  }
  $scope.unequipEngine = function(selectedEngine){
    player.engine = {
      id: false,
      acceleration : 0.01,
      topspeed : 0
    };
  }
  $scope.unequipSideEngine = function(){
    player.sideEngine = {
      id: false,
      acceleration : 0.01,
      topspeed : 0
    };
  }
  $scope.equipEngine = function(engine){
    player.engine = engine;
    engine.equipped = true;
  }
  $scope.equipSideEngine = function(sideEngine){
    player.sideEngine = sideEngine;
    sideEngine.equipped = true;
  }
  $scope.equipDroid = function(droid){
    //player.miningDroids.push(droid);
  }
  function updateInterface (){  
    if(!$scope.$$phase) {
      $scope.$apply(function(){
        $scope.craft = function(blueprint){
          for (var i = 0; i < blueprint.items.length; i++) {
            player.removeItemFromInventory(blueprint.items[i].label, blueprint.items[i].quantity);
          };
          player.addItemToInventory(blueprint.result.label, blueprint.result.quantity);
        }
        $scope.removeUpgrade = function(droid, index){
          player.items.push(droid.upgrade[index]);
          droid.upgrades.splice(index, 1);
        }
        $scope.showDroidInfo = function(miningDroid) {
          $scope.droidInfo = {};
          $scope.droidInfo.show = true;
          $scope.droidInfo.droid = miningDroid;
        }
        $scope.collect = function(droid){
          droid.collect($scope.wantedItem);
          $scope.listAvailableDroids = player.listAvailableDroids($scope.wantedItem);
        }
        $scope.cancelCollect = function(droid){
          droid.cancelCollect();
        }
        $scope.selectItem = function(item) {
          $scope.showDroidlist = true;
          $scope.wantedItem = item;
          $scope.listAvailableDroids = player.listAvailableDroids(item);
        }
        $scope.engine = player.engine;
        $scope.sideEngine = player.sideEngine;
        $scope.items = [];
        for (var i = 0; i < player.items.length; i++) {
          $scope.items[i] = _.find(itemDb, function(num){ return num.id === player.items[i][0]; });
          $scope.items[i].quantity = player.items[i][1];
        };
        $scope.miningDroids = player.miningDroids;
        $scope.blueprints = player.blueprints;
        if(player.targetPlanet && player.targetPlanet.items){
         $scope.planetItems = player.targetPlanet.items;
        }
        else{
          $scope.planetItems = [];
        }
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
