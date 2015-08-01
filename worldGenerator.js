function _makeVoxels(l, h, f) {
    var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ]
    	, v = new Int32Array(d[0]*d[1]*d[2])
    	, n = 0;
    for(var k=l[2]; k<h[2]; ++k)
    for(var j=l[1]; j<h[1]; ++j)
    for(var i=l[0]; i<h[0]; ++i, ++n) {
    	v[n] = f(i,j,k);
    }
	return {voxels:v, dims:d};
}

function _createPlanet(radius, position, color) { 
	data = _makeVoxels([-(radius-1),-(radius-1),-(radius-1)], [radius,radius,radius], function(i,j,k) {
	    return i*i+j*j+k*k <= radius*radius ? 0x113344 : 0;
	});

	var result = GreedyMesh (data.voxels, data.dims);
	var geometry = new THREE.Geometry();

	for(var i=0; i<result.vertices.length; ++i) {
		var q = result.vertices[i];
		geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
	}

	for(var i=0; i<result.faces.length; ++i) {
		var q = result.faces[i];
		if(q.length === 5) {
			var f = new THREE.Face3(q[0], q[1], q[2]);
			f.color = new THREE.Color(q[4]);
			f.vertexColors = [f.color,f.color,f.color,f.color];
			geometry.faces.push(f);
			f = new THREE.Face3(q[0], q[2], q[3]);
			geometry.faces.push(f);
		} else if(q.length == 4) {
			var f = new THREE.Face3(q[0], q[1], q[2]);
			f.color = new THREE.Color(q[3]);
			f.vertexColors = [f.color,f.color,f.color];
			geometry.faces.push(f);
		}
	}

	geometry.computeFaceNormals();

	var material = new THREE.MeshLambertMaterial({ color: color });
	surfacemesh	= new THREE.Mesh( geometry, material );
	surfacemesh.doubleSided = false;
	surfacemesh.scale.set(7,7,7);
	surfacemesh.position.set(position.x,position.y,-7*radius*4);
	return surfacemesh;
}

var _createStar = function(radius,position,color){
	var circle = new THREE.Shape();
	for (var i = 0; i < 4; i++) {
	  var pct = (i + 1) / 4;
	  var theta = pct * Math.PI * 2.0;
	  var x = radius * Math.cos(theta);
	  var y = radius * Math.sin(theta);
	  if (i == 0) {
	    circle.moveTo(x, y);
	  } else {
	    circle.lineTo(x, y);
	  }
	}
	var geometry = circle.makeGeometry();
	var material = new THREE.MeshBasicMaterial({ color: color });
	var star = new THREE.Mesh(geometry, material);

	star.position.set(position.x,position.y,position.z);
	return star;
}
function _seed(x,y){
	var i=x+y;
	var k=x-y;
	var frequency=20;
	var amplitude=1;
	var result=0;
	result=amplitude*Math.sin(i*frequency);
	result=result+amplitude*Math.sin(k*frequency);
	return result;
}
var gridSize = {
	x:1500,
	y:1500
} ;
var gridMatrixSize = 1;
var tiles = [];
var prevTilePos;

var _setGridSize = function (gridMatrixSize,gridSize) {

}

var _checkNearestTile = function (position){
	var nearestTilePosition = {};
	nearestTilePosition.x = gridSize.x * Math.round(position.x/gridSize.x);
	nearestTilePosition.y = gridSize.y * Math.round(position.y/gridSize.y);
	return nearestTilePosition;
}
var _initWorld = function (position){
	prevTilePos = _checkNearestTile(position);
	_generateWorld (prevTilePos,true);
}
var _updateWorldOnMove = function (position){
	if (_checkNearestTile(position).x!=prevTilePos.x||_checkNearestTile(position).y!=prevTilePos.y){
		prevTilePos = _checkNearestTile(position);
		//assynchrone
		_generateWorld (prevTilePos,false);
	}
}
var _generateWorld = function (nearestTilePosition,init){
	for ( l = 0 ; l < tiles.length ; l++ ) {
		tiles[l].stay = false;
	}
	var pseudoPosition = {};
	for(j=-gridMatrixSize;j<=gridMatrixSize;j++){
		pseudoPosition.y = nearestTilePosition.y-j*gridSize.y;
		for(i=-gridMatrixSize;i<=gridMatrixSize;i++){
			pseudoPosition.x = nearestTilePosition.x-i*gridSize.x;
			//check if already in tiles
			var inArray=false;
			for ( l = 0 ; l < tiles.length ; l++ ){
				if(tiles[l].gridPosX===pseudoPosition.x/gridSize.x && tiles[l].gridPosY===pseudoPosition.y/gridSize.y){
					tiles[l].stay=true;
					inArray=true;
				}
			}
			if (!inArray){
				_generateTile(pseudoPosition);
			} 
		}
	}
	for ( l = 0 ; l < tiles.length ; l++ ){	
		if (!tiles[l].stay){
			worldGenerator.scene.remove(tiles[l]);
			doDispose(tiles[l]);
			tiles.splice(l, 1);
		}
	}
}

var _generateTile = function(position){
	var tileIndex = tiles.length;
	tiles[ tileIndex] = new THREE.Object3D();
	tiles[ tileIndex].stay=true;
	tiles[ tileIndex].stars = [];
	tiles[ tileIndex].planets = [];
	tiles[ tileIndex].gridPosX = position.x/gridSize.x;
	tiles[ tileIndex].gridPosY = position.y/gridSize.y;

	/*var square = new THREE.Shape();
    square.moveTo(-gridSize.x/2+5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, -gridSize.y/2+5);

	var geometry = square.makeGeometry();
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.3});
	var square = new THREE.Mesh(geometry, material);
	square.position.set(position.x,position.y,-500);
	var wireframe = new THREE.WireframeHelper( square, 0xffffff );
	
	tiles[ tileIndex ].stars.push(square);
	tiles[ tileIndex ].stars.push(wireframe);*/

	var indexX = position.x - gridSize.x/2;
	var indexY = position.y - gridSize.y/2;

	//stars
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + Math.abs(_seed(indexX,0))*100+75 ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + Math.abs(_seed(indexY,0)*100)+75 ) {
	 		var radius=0;
	 		if(indexX+indexY!=0){
	 			var radiusGenerator = _SeedRandom(Math.pow(_seed(indexX,indexY),2));
	 			radius = radiusGenerator(6);
	 		}
	 		if (radius && radius!=0){
	 			var rngPositionX = _SeedRandom(Math.abs(indexX+indexY));
	 			var rngPositionY = _SeedRandom(Math.abs(indexY-indexX));
	 			var rngColor = _SeedRandom(Math.abs(indexX-indexY));
	 			var starPosition = {
	 				x : indexX + rngPositionX(500) - 250,
	 				y : indexY + rngPositionY(500) - 250,
	 				z : -500
	 			}
	 			var red = 255;
	 			var green = 255;
	 			var blue = 220;
	 			if(rngColor(100)>80){
	 				var red = Math.round(255-rngPositionX(100));
	 				var green =Math.round( 250-rngPositionX(100)-rngPositionY(100));
	 				var blue = Math.round( 255-rngPositionY(100));
	 			}
	 			var color ="rgb("+red+","+green+","+blue+")";
	 			tiles[ tileIndex ].stars.push(_createStar (radius,starPosition,color));
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	//planets

	indexX = position.x - gridSize.x/2;
	indexY = position.y - gridSize.y/2;

	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + Math.abs(_seed(indexX,0))*2000+1500 ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + Math.abs(_seed(indexY,0)*2000)+1500 ) {
	 		var radius=0;
	 		if(indexX+indexY!=0){
	 			var radiusGenerator = _SeedRandom(Math.pow(_seed(indexX,indexY),2));
	 			var existanceGenerator = _SeedRandom(Math.abs(indexX*indexY));
	 			radius = 5 + Math.round(radiusGenerator(15));
	 			if (radius && radius!=0 && existanceGenerator(100)>90){
		 			var rngPositionX = _SeedRandom(Math.abs(indexX+indexY));
		 			var rngPositionY = _SeedRandom(Math.abs(indexY-indexX));
		 			var rngColor = _SeedRandom(Math.abs(indexX-indexY));
		 			var planetPosition = {
		 				x : indexX + rngPositionX(500) - 250,
		 				y : indexY + rngPositionY(500) - 250,
		 				z : -500
		 			}
		 			var red = 255;
		 			var green = 255;
		 			var blue = 220;
		 			var red = Math.round(rngPositionX(255));
		 			var green =Math.round( rngColor(255));
		 			var blue = Math.round( rngPositionY(255));
		 			var color ="rgb("+red+","+green+","+blue+")";
		 			tiles[ tileIndex ].planets.push(_createPlanet (radius,planetPosition,color));
	 			}
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	//add all objects to the scene
	worldGenerator.scene.add(tiles[tileIndex]);
	for ( k = 0 ; k < tiles[tileIndex].stars.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].stars[k]);
	}
	for ( k = 0 ; k < tiles[tileIndex].planets.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].planets[k]);
	}
}

function _SeedRandom(state1,state2){
    var mod1=4294967087
    var mul1=65539
    var mod2=4294965887
    var mul2=65537
    if(typeof state1!="number"){
        state1=+new Date()
    }
    if(typeof state2!="number"){
        state2=state1
    }
    state1=state1%(mod1-1)+1
    state2=state2%(mod2-1)+1
    function random(limit){
        state1=(state1*mul1)%mod1
        state2=(state2*mul2)%mod2
        if(state1<limit && state2<limit && state1<mod1%limit && state2<mod2%limit){
            return random(limit)
        }
        return (state1+state2)%limit
    }
    return random
}

var worldGenerator = {
	updateWorldOnMove : _updateWorldOnMove,
	initWorld : _initWorld,
	setGridSize : _setGridSize
}

if (typeof(module) !== 'undefined') module.exports = worldGenerator;