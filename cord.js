_direction = function ( startPosition , directionPosition ){
	var result = {
		angle : 0
	};

	if(/*directionPosition&&startPosition&&directionPosition.x&&startPosition.x&&startPosition.y&&directionPosition.y&&*/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2))!=0){
		result.angle = Math.acos((directionPosition.x-startPosition.x)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2)));
		var sin=(directionPosition.y-startPosition.y)/Math.sqrt(Math.pow(directionPosition.x-startPosition.x,2)+Math.pow(directionPosition.y-startPosition.y,2));
		if(sin<0) result.angle = -result.angle;
	}
	return result;
}
_moveIndirection = function ( position , direction , distance ){
	position.x = position.x + Math.cos(direction.angle)*distance;
	position.y = position.y + Math.sin(direction.angle)*distance;
	return position;
}
var cord = {
	direction : _direction,
	moveIndirection :_moveIndirection
}