var flatLayer = require('./flatLayer.js');

var player = new THREE.Object3D();
var _collect = function (item){
  this.active = true;
  this.position = player.targetPlanet.mid;
  this.item = item;
}
player.pickUpDroid = function() {
  for (var i = 0; i < player.miningDroids.length; i++) {
    if(player.miningDroids[i].position === player.targetPlanet.mid && player.miningDroids[i].timer <= 0){
      player.miningDroids[i].active = false;
      player.miningDroids[i].position = undefined;
      player.miningDroids[i].timer = player.miningDroids[i].searchTime;
      player.addItemToInventory(player.miningDroids[i].item.label, player.miningDroids[i].capacity)
    }
  };
}
player.addItemToInventory = function(label, quantity){
  var found = false;
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i].label === label){
      player.items[i].quantity = player.items[i].quantity+quantity;
      found = true;
    }
  };
  if (!found) player.items.push({label:label, quantity:quantity});
  flatLayer.message(quantity + " " + label + " added to inventory");
} 
function droidProgress (){
  setTimeout(function(){  
    for(i=0;i<player.miningDroids.length;i++){
      if(player.miningDroids[i].active){ 
        if(player.miningDroids[i].timer>0){
          player.miningDroids[i].timer = player.miningDroids[i].timer - 1;
        }
      }
      console.log(player.miningDroids[i].label + " : " +player.miningDroids[i].timer);
    }
    droidProgress();
  }, 1000);
}

player.engine = {
  label: "basic engine",
  acceleration : 0.07,
  topspeed :7
};
player.sideEngine = {
  label: "basic side engine",
  acceleration : 0.05,
  topspeed :3
};
player.miningDroids= [
  {
    label: "basic mining droid",
    capacity : 1,
    searchTime : 5,
    timer : 5,
    active : false,
    collect : _collect
  }
];
flatLayer.droids = player.miningDroids;
flatLayer.origin = player.position;
player.items=[
  {
    label : "iron",
    quantity : 5
  }
];
droidProgress();
player.moveForward = false;
player.moveBackward = false;
player.moveRight = false;
player.moveLeft = false;
player.maxHealth = 100;
player.remove = function(){
  console.log("player died");
  this.position.x = 0;
  this.position.y = 0;
  this.position.z = 0;
  this.health = this.maxHealth;
};
player.health = player.maxHealth;
player.attackSpeed = 10;
player.bulletRange = 2500;
player.bulletDamage = 20;
player.label = "player";
player.shipModel = spawnMesh(ship);
player.add( player.shipModel );
player.listAvailableDroids = function(){
  if (player.targetPlanet){
    var availableDroids = [];
    for (i=0; i<player.miningDroids.length; i++){
      if (!player.miningDroids[i].active) availableDroids.push(player.miningDroids[i]);
    }
    return availableDroids
  }
}
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
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );

if (typeof(module) !== 'undefined') module.exports = player;