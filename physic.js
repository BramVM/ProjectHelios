_exponentialAcceleration = function ( currentSpeed, topspeed ,acceleration ){
	return currentSpeed+(topspeed-currentSpeed)*acceleration;
}
var physic = {
	exponentialAcceleration : _exponentialAcceleration
}