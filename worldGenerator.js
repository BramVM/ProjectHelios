var seedrandom = require('seedrandom');

function _makeEllipsoid(l, h, f) {
    var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ], 
    	v = new Int32Array(d[0]*d[1]*d[2]),
    	n = 0;
    for(var k=l[2]; k<h[2]; ++k)
    for(var j=l[1]; j<h[1]; ++j)
    for(var i=l[0]; i<h[0]; ++i, ++n) {
    	v[n] = f(i,j,k);
    }
	return {voxels:v, dims:d};
}

function _createPlanet(radius, position, color) { 
	data = _makeEllipsoid([-(radius-1),-(radius-1),-(radius-1)], [radius,radius,radius], function(i,j,k) {
	    return i*i+j*j+k*k <= radius*radius ? 0x113344 : 0;
	});

	var result = GreedyMesh (data.voxels, data.dims);
	var geometry = new THREE.Geometry();

	for(var i=0; i<result.vertices.length; ++i) {
		var q = result.vertices[i];
		geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
	}

	for(i=0; i<result.faces.length; ++i) {
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
	  if (i === 0) {
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
};
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

};

var _checkNearestTile = function (position){
	var nearestTilePosition = {};
	nearestTilePosition.x = gridSize.x * Math.round(position.x/gridSize.x);
	nearestTilePosition.y = gridSize.y * Math.round(position.y/gridSize.y);
	return nearestTilePosition;
};
var _initWorld = function (position){
	prevTilePos = _checkNearestTile(position);
	_generateWorld (prevTilePos,true);
};
var _updateWorldOnMove = function (position){
	if (_checkNearestTile(position).x!=prevTilePos.x||_checkNearestTile(position).y!=prevTilePos.y){
		prevTilePos = _checkNearestTile(position);
		//assynchrone
		_generateWorld (prevTilePos,false);
	}
};
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
};
var biomes = [
	{
		label : "defualt",
		starDensety : 5,
		starColor : {
			r : 225,
			g : 225,
			b : 225,
			delta: 20
		},
		maxStarSize : 6,
		minPlanetSize : 5,
		maxPlanetSize : 20,
		planetColor : {
			r : 80,
			g : 225,
			b : 80,
			delta: 20
		},
		numberOfPlanetsByAcreage : 0.0003
	},
	{
		label : "red",
		starDensety : 7,
		starColor : {
			r : 225,
			g : 110,
			b : 110,
			delta: 20
		},
		maxStarSize : 6,
		minPlanetSize : 5,
		maxPlanetSize : 20,
		planetColor : {
			r : 225,
			g : 80,
			b : 80,
			delta: 20
		},
		numberOfPlanetsByAcreage : 0.0003
	},
	{
		label : "blue",
		starDensety : 6,
		starColor : {
			r : 110,
			g : 110,
			b : 225,
			delta: 20
		},
		maxStarSize : 6,
		minPlanetSize : 5,
		maxPlanetSize : 20,
		planetColor : {
			r : 80,
			g : 80,
			b : 225,
			delta: 20
		},
		numberOfPlanetsByAcreage : 0.0003
	}
];
function seed(x,y){
	var i=x-y;
	var k=x+y;
	var frequency=0.0002;
	var amplitude=1;
	var offset=0;
	var newSin;
	var result=0;
	for (var j=0;j<1;j++){
		amplitude=amplitude/2;
		frequency=frequency*2;
		newSin=amplitude*Math.sin(((k+offset)*frequency));
		newSin=newSin+amplitude*Math.sin(((i+offset)*frequency));
		//offset=offset+100;
		result=result+newSin;
	}
	return result;
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
	
	var color = {
		r : 225,
		g : 110,
		b : 110
	};
	colorDelta = 20;
	
	//stars
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + gridSize.x/biome.starDensety ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + gridSize.y/biome.starDensety ) {
			
			//set star values depending on biome
			var seedValue = seed(indexX,indexY);
			seedValue > 0 ? biome=biomes[1] : biome=biomes[2] ;
			var biomeIntensity = Math.abs(seedValue);
			var seededColor = {
 				r : biome.starColor.r * biomeIntensity + biomes[0].starColor.r * (1-biomeIntensity),
 				g : biome.starColor.g * biomeIntensity + biomes[0].starColor.g * (1-biomeIntensity),
 				b : biome.starColor.b * biomeIntensity + biomes[0].starColor.b * (1-biomeIntensity)
 			};
 			seededRadius = biome.maxStarSize * biomeIntensity + biomes[0].maxStarSize * (1-biomeIntensity);

			//random size
 			Math.seedrandom("radius" + indexX + '&' + indexY);
 			seededRadius = Math.random()*seededRadius;
	 		if (seededRadius && seededRadius!==0){
	 			//random position
	 			var seededPosition = {
	 				z : -500
	 			};
	 			Math.seedrandom("x" + indexX + '&' + indexY);
	 			seededPosition.x = indexX - (gridSize.x/biome.starDensety)/2 + Math.random()*gridSize.x/biome.starDensety;
	 			Math.seedrandom("y" + indexX + '&' + indexY);
	 			seededPosition.y = indexY - (gridSize.y/biome.starDensety)/2 + Math.random()*gridSize.y/biome.starDensety;
	 			
	 			//random color
	 			Math.seedrandom("r" + indexX + '&' + indexY);
	 			seededColor.r = Math.round(seededColor.r - biome.starColor.delta + Math.random()*biome.starColor.delta);
	 			Math.seedrandom("g" + indexX + '&' + indexY);
	 			seededColor.g = Math.round(seededColor.g - biome.starColor.delta + Math.random()*biome.starColor.delta);
	 			Math.seedrandom("b" + indexX + '&' + indexY);
	 			seededColor.b = Math.round(seededColor.b - biome.starColor.delta + Math.random()*biome.starColor.delta);
	 			seededColor ="rgb("+seededColor.r+","+seededColor.g+","+seededColor.b+")";
	 			//create star
	 			tiles[ tileIndex ].stars.push(_createStar (seededRadius,seededPosition,seededColor));
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	
	//planets
	var minPlanetSize = 5;
	var maxPlanetSize = 20;
	var numberOfPlanetsByAcreage = 0.0003; //capped to 1 per tile

	var scale = 7; //size of each voxel

	//check existance based on numberOfPlanetsByAcreage
	Math.seedrandom("existance" + position.x + '&' + position.y);
	if (Math.random()<Math.sqrt(gridSize.x*gridSize.y)*biome.numberOfPlanetsByAcreage){
		//set planet values depending on biome
		var seedValue = seed(position.x,position.y);
		seedValue > 0 ? biome=biomes[1] : biome=biomes[2] ;
		var biomeIntensity = Math.abs(seedValue);
		var seededColor = {
			r : biome.planetColor.r * biomeIntensity + biomes[0].planetColor.r * (1-biomeIntensity),
			g : biome.planetColor.g * biomeIntensity + biomes[0].planetColor.g * (1-biomeIntensity),
			b : biome.planetColor.b * biomeIntensity + biomes[0].planetColor.b * (1-biomeIntensity)
		};
		seededMaxPlanetSize = biome.maxPlanetSize * biomeIntensity + biomes[0].maxPlanetSize * (1-biomeIntensity);
	 	seededMinPlanetSize = biome.minPlanetSize * biomeIntensity + biomes[0].minPlanetSize * (1-biomeIntensity);
		//random radius
		Math.seedrandom("radius" + position.x + '&' + position.y);
		var radius = seededMinPlanetSize + Math.round(Math.random()*(seededMaxPlanetSize-seededMinPlanetSize));
		//randomize position
		Math.seedrandom("position" + position.x + '&' + position.y);
		var maxOffsetX = gridSize.x/2 - radius*7/2;
		var maxOffsetY = gridSize.y/2 - radius*7/2;
		var planetPosition = {
			x : position.x - maxOffsetX + Math.random()*maxOffsetX*2,
			y : position.y - maxOffsetY + Math.random()*maxOffsetY*2,
			z : -500
		}

		//randomize color
		Math.seedrandom("r" + position.x + '&' + position.y);
		seededColor.r = Math.round(seededColor.r - colorDelta + Math.random()*colorDelta);
		Math.seedrandom("g" + position.x + '&' + position.y);
		seededColor.g = Math.round(seededColor.g - colorDelta + Math.random()*colorDelta);
		Math.seedrandom("b" + position.x + '&' + position.y);
		seededColor.b = Math.round(seededColor.b - colorDelta + Math.random()*colorDelta);
		seededColor ="rgb("+seededColor.r+","+seededColor.g+","+seededColor.b+")";
		tiles[ tileIndex ].planets.push(_createPlanet (radius,planetPosition,seededColor));
	}
	Math.seedrandom();

	//add all objects to the scene
	worldGenerator.scene.add(tiles[tileIndex]);
	for ( k = 0 ; k < tiles[tileIndex].stars.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].stars[k]);
	}
	for ( k = 0 ; k < tiles[tileIndex].planets.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].planets[k]);
	}
}

var worldGenerator = {
	updateWorldOnMove : _updateWorldOnMove,
	initWorld : _initWorld,
	setGridSize : _setGridSize
}

if (typeof(module) !== 'undefined') module.exports = worldGenerator;