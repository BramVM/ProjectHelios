_exponentialAcceleration = function ( currentSpeed, topspeed ,acceleration ){
	return currentSpeed+(topspeed-currentSpeed)*acceleration;
}
_addToColliderList = function (object){
	physic.collidableMeshList.push(object);
}
_removeFromColliderList = function (object){
	physic.collidableMeshList.splice(object,1);
}
_checkCollission = function (MovingCube){
	function topObject (child){
		var result=child;
		while(result && result.parent && result.parent.type!="Scene") result = result.parent;
		return result;
	}
	if (MovingCube.geometry){
		/*var globalPosition = new THREE.Vector3();
		globalPosition.setFromMatrixPosition( MovingCube.matrixWorld );*/
		var originPoint = topObject(MovingCube).position;
		for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++)
		{		
			var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( MovingCube.matrixWorld );
			var directionVector = globalVertex.sub( originPoint);
			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			var collisionResults = ray.intersectObjects( physic.collidableMeshList , true);
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
				return collisionResults[0].object;
		}
	}
	return false
}
_checkCollissionRecursive = function (MovingCube){
	var objects = [];
	objects.push(MovingCube);
	for ( var i = 0; i < objects.length; i ++ ) {
		var collider = _checkCollission(objects[i],physic.collidableMeshList);
		if( collider !== false ){
			return collider
		}
		if(objects[i].children.length>0){
			var children = objects[i].children; 
			for ( var k = 0, m = children.length; k < m; k ++ ) {
				objects.push(children[k]);
			}	
		}
	}
	return false
}
var physic = {
	exponentialAcceleration : _exponentialAcceleration,
	checkCollission : _checkCollission,
	checkCollissionRecursive : _checkCollissionRecursive,
	addToColliderList : _addToColliderList,
	removeFromColliderList : _removeFromColliderList,
	collidableMeshList : []
}
if (typeof(module) !== 'undefined') module.exports = physic;