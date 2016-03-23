var player = require('./player.js');
var thrustArray=[];
var _thruster = function (width,length,speed,topspeed){
	var thrustObject = new THREE.Object3D();
	thrustObject.speed = speed;
	thrustObject.topspeed = topspeed;
	var x=length;
	for (var i = length; i > 0; i--) {
		var opacity = i/length;
		//create voxel
		mesh = pixelMesh(7,'7FFFE9',opacity );
		mesh.opacity = opacity;
		mesh.position.y = (length-i)*7;
		thrustObject.add(mesh);
	}
	thrustArray.push(thrustObject);
	return thrustObject;
}
var _animateThruster = function(){
	for (var i = 0; i < thrustArray.length; i++) {
		if(player.engine.topspeed>0){
			var speedMultiplyer = player.speed/player.engine.topspeed;
			var thrustMultiplyer = - 0.35 + Math.random()*0.35;
			for (var ii = 0; ii < thrustArray[i].children.length; ii++) {
				thrustArray[i].children[ii].material.opacity = thrustArray[i].children[ii].opacity * speedMultiplyer + thrustMultiplyer;
			};
		}
		else{
			for (var ii = 0; ii < thrustArray[i].children.length; ii++) {
				thrustArray[i].children[ii].material.opacity = 0;
			};
		}
	};
}
voxelEffects = {
	thruster : _thruster,
	animateThruster : _animateThruster
}
if (typeof(module) !== 'undefined') module.exports = voxelEffects;