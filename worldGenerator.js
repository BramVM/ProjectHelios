var seedrandom = require('seedrandom');
var seeder = require('./seeder');
var biomes = require('./biomes');
var scene = require('./scene.js');
var threehelper = require('./threehelper.js');
var itemDb = require('./items.js');
var _ = require('underscore');


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

function _createPlanet(radius, position, color, items) { 
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
		var vertices = result.faces[i];
		var f = new THREE.Face3(vertices[0], vertices[1], vertices[2]);
		if(vertices.length === 5) {
			f.color = new THREE.Color(vertices[4]);
			f.vertexColors = [f.color,f.color,f.color,f.color];
			geometry.faces.push(f);
			f = new THREE.Face3(vertices[0], vertices[2], vertices[3]);
			geometry.faces.push(f);
		} else if(vertices.length == 4) {
			f.color = new THREE.Color(vertices[3]);
			f.vertexColors = [f.color,f.color,f.color];
			geometry.faces.push(f);
		}
	}

	geometry.computeFaceNormals();

	var material = new THREE.MeshLambertMaterial({ color: color });
	surfacemesh	= new THREE.Mesh( geometry, material );
	surfacemesh.doubleSided = false;
	surfacemesh.scale.set(7,7,7);
	surfacemesh.position.set(position.x-7*radius,position.y-7*radius,-7*radius*2-35);
	surfacemesh.mid = surfacemesh.position.clone();
  	surfacemesh.mid.x = surfacemesh.mid.x + 7*radius;
  	surfacemesh.mid.y = surfacemesh.mid.y + 7*radius;
	surfacemesh.items = clone(items);
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
var gridSize = {
	x:1000,
	y:1000
} ;
var gridMatrixSize = 2;
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
	var indexes=[];
	for ( l = 0 ; l < tiles.length ; l++ ){	
		if (!tiles[l].stay){
			indexes.push(l);
		}
	}
	for (var r = indexes.length - 1; r >= 0; r--) {
		scene.remove(tiles[indexes[r]]);
		doDispose(tiles[indexes[r]]);
		tiles.splice(indexes[r], 1);
	};
};

var _fillTileWithStars = function(position, tileIndex){
	var indexX = position.x - gridSize.x/2;
	var indexY = position.y - gridSize.y/2;
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + gridSize.x/star.densety ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + gridSize.y/star.densety ) {
			//calculate biome and biome intensity
			var biomeObj = seeder.seedBiome(indexX,indexY);
			//set values depending on biome
			var star = {
				size : biomeObj.biome.stars.maxSize * biomeObj.biomeIntensity + biomes[0].stars.maxSize * (1-biomeObj.biomeIntensity),
				color : {
					r : biomeObj.biome.stars.color.r * biomeObj.biomeIntensity + biomes[0].stars.color.r * (1-biomeObj.biomeIntensity),
 					g : biomeObj.biome.stars.color.g * biomeObj.biomeIntensity + biomes[0].stars.color.g * (1-biomeObj.biomeIntensity),
 					b : biomeObj.biome.stars.color.b * biomeObj.biomeIntensity + biomes[0].stars.color.b * (1-biomeObj.biomeIntensity),
 					delta : biomeObj.biome.stars.color.delta * biomeObj.biomeIntensity + biomes[0].stars.color.delta * (1-biomeObj.biomeIntensity)
				},
				position : {
					x : indexX,
					y : indexY,
					z : -500
				},
				densety : biomeObj.biome.stars.densety * biomeObj.biomeIntensity + biomes[0].stars.densety * (1-biomeObj.biomeIntensity),
				minSize: biomeObj.biome.stars.minSize * biomeObj.biomeIntensity + biomes[0].stars.minSize * (1-biomeObj.biomeIntensity),
				maxSize: biomeObj.biome.stars.maxSize * biomeObj.biomeIntensity + biomes[0].stars.maxSize * (1-biomeObj.biomeIntensity)
			};
			//random, seeded size based biome
			Math.seedrandom("radius" + indexX + '&' + indexY);
			star.size = star.minSize + Math.random()*(star.maxSize-star.minSize);
 			//random seeded position
 			Math.seedrandom("x" + indexX + '&' + indexY);
 			star.position.x = indexX - (gridSize.x/biomeObj.biome.stars.densety)/2 + Math.random()*gridSize.x/biomeObj.biome.stars.densety;
 			Math.seedrandom("y" + indexX + '&' + indexY);
 			star.position.y = indexY - (gridSize.y/biomeObj.biome.stars.densety)/2 + Math.random()*gridSize.y/biomeObj.biome.stars.densety;
 			//random, seeded color based biome
 			Math.seedrandom("r" + indexX + '&' + indexY);
 			star.color.r = Math.round(star.color.r - star.color.delta + 2*Math.random()*star.color.delta);
 			Math.seedrandom("g" + indexX + '&' + indexY);
 			star.color.g = Math.round(star.color.g - star.color.delta + 2*Math.random()*star.color.delta);
 			Math.seedrandom("b" + indexX + '&' + indexY);
 			star.color.b = Math.round(star.color.b - star.color.delta + 2*Math.random()*star.color.delta);
 			star.color ="rgb("+star.color.r+","+star.color.g+","+star.color.b+")";
 			//create star
 			tiles[ tileIndex ].stars.push(_createStar (star.size,star.position,star.color));
	 		
	 	}
		indexY = position.y - gridSize.y/2;
	}
};
_addPlanetToTile = function(position, tileIndex){
	var scale = 7; //size of each voxel
	//calculate biome and biome intensity
	var biomeObj = seeder.seedBiome(position.x,position.y);
	//check existance based on planets.densety
	Math.seedrandom("existance" + position.x + '&' + position.y);
	if (Math.random()<Math.sqrt(gridSize.x*gridSize.y)*biomeObj.biome.planets.densety){
		//set planet values depending on biome
		var planet = {
			color : {
				r : biomeObj.biome.planets.color.r * biomeObj.biomeIntensity + biomes[0].planets.color.r * (1-biomeObj.biomeIntensity),
				g : biomeObj.biome.planets.color.g * biomeObj.biomeIntensity + biomes[0].planets.color.g * (1-biomeObj.biomeIntensity),
				b : biomeObj.biome.planets.color.b * biomeObj.biomeIntensity + biomes[0].planets.color.b * (1-biomeObj.biomeIntensity),
				delta : biomeObj.biome.planets.color.delta * biomeObj.biomeIntensity + biomes[0].planets.color.delta * (1-biomeObj.biomeIntensity)
			}
		};
		//random radius
		seededMaxPlanetSize = biomeObj.biome.planets.maxSize * biomeObj.biomeIntensity + biomes[0].planets.maxSize * (1-biomeObj.biomeIntensity);
	 	seededMinPlanetSize = biomeObj.biome.planets.minSize * biomeObj.biomeIntensity + biomes[0].planets.minSize * (1-biomeObj.biomeIntensity);
		Math.seedrandom("radius" + position.x + '&' + position.y);
		var radius = seededMinPlanetSize + Math.round(Math.random()*(seededMaxPlanetSize-seededMinPlanetSize));
		//randomize position
		Math.seedrandom("position" + position.x + '&' + position.y);
		var maxOffsetX = gridSize.x/2 - radius*7/2;
		var maxOffsetY = gridSize.y/2 - radius*7/2;
		planet.position = {
			x : position.x - maxOffsetX + Math.random()*maxOffsetX*2,
			y : position.y - maxOffsetY + Math.random()*maxOffsetY*2,
			z : -500
		};
		//randomize color
		Math.seedrandom("r" + position.x  + '&' + position.y );
		planet.color.r = Math.round(planet.color.r - planet.color.delta + 2*Math.random()*planet.color.delta);
		Math.seedrandom("g" + position.x  + '&' + position.y );
		planet.color.g = Math.round(planet.color.g - planet.color.delta + 2*Math.random()*planet.color.delta);
		Math.seedrandom("b" + position.x  + '&' + position.y );
		planet.color.b = Math.round(planet.color.b - planet.color.delta + 2*Math.random()*planet.color.delta);
		planet.color ="rgb("+planet.color.r+","+planet.color.g+","+planet.color.b+")";
		//items
		planet.items = [];
		if(biomeObj.biome.planets.items){
			for (b=0; b<biomeObj.biome.planets.items.length; b++){
				var item = _.find(itemDb, function(num){ return num.id === biomeObj.biome.planets.items[b].id; });
				planet.items.push(clone(item));
				planet.items[b].probability = biomeObj.biome.planets.items[b].probability*biomeObj.biomeIntensity;
				planet.items[b].share = Math.round(biomeObj.biome.planets.items[b].share*biomeObj.biomeIntensity*100)/100;
			}
		}
		if(biomes[0].planets.items){
			for (b=0; b<biomes[0].planets.items.length;b++){
				var notInItems = true;
				for (m=0; m<planet.items.length;m++){
					if (biomes[0].planets.items[b].id === planet.items[m].id){
						notInItems = false;
						planet.items[m].probability = planet.items[m].probability + (biomes[0].planets.items[b].probability * (1-biomeObj.biomeIntensity));
						planet.items[m].share = Math.round((planet.items[m].share + (biomes[0].planets.items[b].share * (1-biomeObj.biomeIntensity)))*100)/100;
					}
				}
				if (notInItems) {
					var item = _.find(itemDb, function(num){ return num.id === biomes[0].planets.items[b].id; });
					planet.items.push(clone(item));
					var index = planet.items.length-1;
					planet.items[index].probability = biomes[0].planets.items[b].probability*(1-biomeObj.biomeIntensity);
					planet.items[index].share = Math.round(biomes[0].planets.items[b].share*(1-biomeObj.biomeIntensity)*100)/100;
				}
			}
		}
		//checkSum composition
		var finalItems = [];
		var totalShare = 100;
		for (var i = 0; i < planet.items.length; i++) {
			Math.seedrandom(planet.items[i].label + position.x + position.y );
			if(totalShare - planet.items[i].share >= 0 && Math.random()<= planet.items[i].probability && planet.items[i].share > 0){
				finalItems.push(planet.items[i]);
				totalShare = Math.round((totalShare - planet.items[i].share)*100)/100;
			}
		};
		if (totalShare > 0){
			var junk = 	clone(_.find(itemDb, function(num){ return num.id === 0; }));
			junk.probability = 1;
			junk.share = totalShare;
			finalItems.push(junk);
		}
		//add to tile
		tiles[ tileIndex ].planets.push(_createPlanet (radius, planet.position, planet.color, finalItems));
	}
};
var _visualizeTiles = function(position, tileIndex){
	var square = new THREE.Shape();
    square.moveTo(-gridSize.x/2+5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, gridSize.y/2-5);
    square.lineTo(gridSize.x/2-5, -gridSize.y/2+5);
    square.lineTo(-gridSize.x/2+5, -gridSize.y/2+5);
	var geometry = square.makeGeometry();
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.3});
	square = new THREE.Mesh(geometry, material);
	square.position.set(position.x,position.y,-500);
	var wireframe = new THREE.WireframeHelper( square, 0xffffff );
	tiles[ tileIndex ].stars.push(square);
	tiles[ tileIndex ].stars.push(wireframe);
};
var _generateTile = function(position){
	var tileIndex = tiles.length;
	tiles[ tileIndex] = new THREE.Object3D();
	tiles[ tileIndex].stay = true;
	tiles[ tileIndex].stars = [];
	tiles[ tileIndex].planets = [];
	tiles[ tileIndex].gridPosX = position.x/gridSize.x;
	tiles[ tileIndex].gridPosY = position.y/gridSize.y;

	//_visualizeTiles(position, tileIndex);
	
	_fillTileWithStars(position, tileIndex);
	_addPlanetToTile(position, tileIndex);
	
	
	Math.seedrandom();

	//add all objects to the scene
	scene.add(tiles[tileIndex]);
	for ( k = 0 ; k < tiles[tileIndex].stars.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].stars[k]);
	}
	for ( k = 0 ; k < tiles[tileIndex].planets.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].planets[k]);
	}
};

var worldGenerator = {
	updateWorldOnMove : _updateWorldOnMove,
	initWorld : _initWorld,
	setGridSize : _setGridSize
};

if (typeof(module) !== 'undefined') module.exports = worldGenerator;