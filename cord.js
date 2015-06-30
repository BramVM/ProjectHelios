_direction = function ( startPosition , directionPosition ){
	var result = {
		angle : 0
	};
	//console.log(Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2)));
	if(/*directionPosition&&startPosition&&directionPosition.x&&startPosition.x&&startPosition.y&&directionPosition.y&&*/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2))!=0){
		result.angle = Math.acos((directionPosition.x-startPosition.x)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2)));
		var asin=Math.asin((directionPosition.y-startPosition.y)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2)));
		if(asin<0) result.angle = Math.PI-result.angle;
	}
	return result;
}
_moveIndirection = function ( position , direction , speed ){
	console.log(position);
	position.x = position.x + Math.cos(direction.angle)*speed;
	position.y = position.y + Math.sin(direction.angle)*speed;
	return position;
}
var cord = {
	direction : _direction,
	moveIndirection :_moveIndirection
}