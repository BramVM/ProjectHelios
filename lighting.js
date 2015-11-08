var scene = require('./scene.js');
var player = require('./player');

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0.5, -1, 1 );
scene.add( directionalLight );
var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight2.position.set( -0.5, 0.5, 1 );
scene.add( directionalLight2 );
//var ambientLight = new THREE.AmbientLight (0x404040);
//scene.add(ambientLight);

function _updateLighting(x,y){
  if (player.biome && player.biomeIntensity ){
    var color = new THREE.Color();
    color.r = (player.biome.light.color.r*player.biomeIntensity + 255*(1-player.biomeIntensity))/255;
    color.g = (player.biome.light.color.g*player.biomeIntensity + 255*(1-player.biomeIntensity))/255;
    color.b = (player.biome.light.color.b*player.biomeIntensity + 255*(1-player.biomeIntensity))/255;
    directionalLight.color= color;
    var max = player.biome.light.max*player.biomeIntensity + 0.5*(1-player.biomeIntensity);
    var min = player.biome.light.min*player.biomeIntensity + 0.4*(1-player.biomeIntensity);
    var flux = player.biome.light.flux*player.biomeIntensity + 0.01*(1-player.biomeIntensity);
    if(directionalLight.intensity < max){
      directionalLight.intensity = directionalLight.intensity + Math.random() * flux;
    }
    if(directionalLight2.intensity < max){
      directionalLight2.intensity = directionalLight2.intensity + Math.random() * flux;
    }
    if(directionalLight.intensity > min){
      directionalLight.intensity = directionalLight.intensity - Math.random() * flux;
    }
    if(directionalLight2.intensity > min){
      directionalLight2.intensity = directionalLight2.intensity - Math.random() * flux;
    }
    directionalLight2.color= color;
    var intensity = (color.r + color.g + color.b)/3;
    if(player.spotLightLeft){
  		player.spotLightLeft.intensity = 1 - intensity*directionalLight2.intensity - intensity*directionalLight.intensity;
  	}
  	if(player.spotLightRight){
  		player.spotLightRight.intensity = 1 - intensity*directionalLight2.intensity - intensity*directionalLight.intensity;
  	}
  }
}

var lighting = {
  updateLighting: _updateLighting
}

if (typeof(module) !== 'undefined') module.exports = lighting;