var flatLayer = require('./flatLayer.js');
model = require('./models/mainShip.js');
var seeder = require('./seeder');

var player = new THREE.Object3D();
var _collect = function (item){
  this.time = Math.round(100/item.share*this.searchTime);
  this.timer = this.time;
  this.active = true;
  this.position = player.targetPlanet.mid;
  this.item = item;
}
var _cancelCollect = function (){
  this.time = 0;
  this.timer = 0;
  this.active = false;
  this.position = false;
  this.item = false;
}
player.updateCraftableBlueprint = function(){
  for (var b = 0; b < player.blueprints.length; b++) {
    var allItemsFound = true;
    for (var i = 0; i< player.blueprints[b].items.length; i++){
      if(!player.checkItemInInventory(player.blueprints[b].items[i].label, player.blueprints[b].items[i].quantity)) allItemsFound = false;
    }
    if(allItemsFound){
      player.blueprints[b].craftable = true;
    }
    else{
      player.blueprints[b].craftable = false;
    }
  };
}
player.pickUpDroid = function() {
  for (var i = 0; i < player.miningDroids.length; i++) {
    if(player.miningDroids[i].position && player.miningDroids[i].position.x === player.targetPlanet.mid.x && player.miningDroids[i].position.y === player.targetPlanet.mid.y && player.miningDroids[i].timer <= 0){
      player.miningDroids[i].active = false;
      player.miningDroids[i].position = undefined;
      player.addItemToInventory(player.miningDroids[i].item, player.miningDroids[i].capacity)
    }
  };
}
player.checkItemInInventory = function(id, quantity){
  var itemFound = false;
  for (var ii = 0; ii < player.items.length; ii++) {
    if (player.items[ii][0] === id && player.items[ii][1] >= quantity){
      itemFound = true;
    }
  }
  return itemFound;
};
player.addItemToInventory = function(item, quantity){
  var found = false;
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i][0] === item.id){
      player.items[i][1] = player.items[i][1]+quantity;
      found = true;
    }
  };
  if (!found) player.items.push([item.id, quantity]);
  flatLayer.message(quantity + " " + item.label + " added to inventory");
  player.updateCraftableBlueprint();
}
player.removeItemFromInventory = function(id, quantity){
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i][0] === id){
      player.items[i][1] = player.items[i][1]-quantity;
      if(player.items[i][1]<=0) player.items.splice(i,1);
    }
  };
  flatLayer.message(quantity + " " + id + " removed from inventory");
  player.updateCraftableBlueprint();
} 
function droidProgress (){
  setTimeout(function(){  
    for(i=0;i<player.miningDroids.length;i++){
      if(player.miningDroids[i].active){ 
        if(player.miningDroids[i].timer>0){
          player.miningDroids[i].timer = player.miningDroids[i].timer - 1;
        }
      }
    }
    droidProgress();
  }, 1000);
}

player.engine = {
  id: 8,
  label: "basic engine",  
  acceleration : 0.07,
  topspeed :7,
  type: 1
};
player.sideEngine = {
  id: 9,
  label: "basic side engine",
  acceleration : 0.05,
  topspeed :3,
  type:2
};
player.miningDroids = [
  {
    label: "basic droid",
    capacity : 1,
    searchTime : 1,
    timer : 0,
    active : false,
    collect : _collect,
    cancelCollect: _cancelCollect
  }
];
flatLayer.droids = player.miningDroids;
flatLayer.origin = player.position;
player.blueprints = [
  {
    label : "super item",
    items : [
      {
        label : "iron",
        quantity : 6
      }
    ],
    result : {
      label : "super item",
      quantity : 1
    }
  }
]
player.items = [[1,5],[8,1],[9,1],[10,1]];
droidProgress();
player.moveForward = false;
player.moveBackward = false;
player.moveRight = false;
player.moveLeft = false;
player.maxHealth = 100;
player.passiveRegen = 0.01;
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
player.bulletModelData = require('./models/bullet.js');
player.label = "player";
player.shipModelData = model;
player.shipModel = spawnMesh(model);
player.add( player.shipModel );

player.updateBiome = function(){
  var biomeObj = seeder.seedBiome(player.position.x, player.position.y);
  player.biome = biomeObj.biome;
  player.biomeMid = biomeObj.mid;
  player.biomeIntensity = biomeObj.biomeIntensity;
}
player.updateBiome();

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