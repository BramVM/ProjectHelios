var scene = require('./scene.js');
var seeder = require('./seeder');
var biomes = require('./biomes');

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 1, -0.5, 1 );
scene.add( directionalLight );
var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight2.position.set( -1, 0.5, 1 );
scene.add( directionalLight2 );
//var ambientLight = new THREE.AmbientLight (0x404040);
//scene.add(ambientLight);

function _updateLighting(x,y){
  var biomeObj = seeder.seedBiome(x,y);
  var color = new THREE.Color();
  color.r = (biomeObj.biome.light.color.r*biomeObj.biomeIntensity + 255*(1-biomeObj.biomeIntensity))/255;
  color.g = (biomeObj.biome.light.color.g*biomeObj.biomeIntensity + 255*(1-biomeObj.biomeIntensity))/255;
  color.b = (biomeObj.biome.light.color.b*biomeObj.biomeIntensity + 255*(1-biomeObj.biomeIntensity))/255;
  directionalLight.color= color;
  directionalLight2.color= color;
}

var lighting = {
  updateLighting: _updateLighting
}

if (typeof(module) !== 'undefined') module.exports = lighting;