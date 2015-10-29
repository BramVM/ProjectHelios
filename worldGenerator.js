var seedrandom = require('seedrandom');
var biomes = require('./biomes');

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
	surfacemesh.position.set(position.x-7*radius,position.y-7*radius,-7*radius*2-7);
	surfacemesh.mid = surfacemesh.position.clone();
  	surfacemesh.mid.x = surfacemesh.mid.x + 7*radius;
  	surfacemesh.mid.y = surfacemesh.mid.y + 7*radius;
	surfacemesh.items = items;
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
function seed(x,y){
	var frequency=0.0007;
	var newSin;
	var result=0;
	sinA=0.5*Math.sin(((x)*frequency));
	sinB=0.5*Math.sin(((y)*frequency));
	var indexOfSin = Math.floor(x/(Math.PI/frequency))+Math.floor(y/(Math.PI/frequency));
	return {
		value : sinA+sinB,
		index : indexOfSin
	};
}
var _calculateBiome = (function () {
    var total = 0;
	for (b=0; b<biomes.length; b++){
		total=total+biomes[b].presence;
	}
	var presence = [];
	if (total>0){
		for (b=0; b<biomes.length; b++){
			presence[b] = biomes[b].presence/total;
		}
	}
    return function (rng) {
    	var a = 0;
    	for (b=0; b<presence.length; b++){
    		if (rng<presence[b]+a){
    			return biomes[b];
    		}
    		a=a+presence[b];
    	}
    };
})();
var _fillTileWithStars = function(position, tileIndex){
	var indexX = position.x - gridSize.x/2;
	var indexY = position.y - gridSize.y/2;
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + gridSize.x/star.densety ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + gridSize.y/star.densety ) {
			//calculate biome and biome intensity
			var seedObj = seed(indexX,indexY);
			Math.seedrandom("biome" + seedObj.index);
			biome = _calculateBiome(Math.random());
			var biomeIntensity = Math.abs(seedObj.value);
			//set values depending on biome
			var star = {
				size : biome.stars.maxSize * biomeIntensity + biomes[0].stars.maxSize * (1-biomeIntensity),
				color : {
					r : biome.stars.color.r * biomeIntensity + biomes[0].stars.color.r * (1-biomeIntensity),
 					g : biome.stars.color.g * biomeIntensity + biomes[0].stars.color.g * (1-biomeIntensity),
 					b : biome.stars.color.b * biomeIntensity + biomes[0].stars.color.b * (1-biomeIntensity),
 					delta : biome.stars.color.delta * biomeIntensity + biomes[0].stars.color.delta * (1-biomeIntensity)
				},
				position : {
					x : indexX,
					y : indexY,
					z : -500
				},
				densety : biome.stars.densety * biomeIntensity + biomes[0].stars.densety * (1-biomeIntensity),
				minSize: biome.stars.minSize * biomeIntensity + biomes[0].stars.minSize * (1-biomeIntensity),
				maxSize: biome.stars.maxSize * biomeIntensity + biomes[0].stars.maxSize * (1-biomeIntensity)
			};
			//random, seeded size based biome
			Math.seedrandom("radius" + indexX + '&' + indexY);
			star.size = star.minSize + Math.random()*(star.maxSize-star.minSize);
 			//random seeded position
 			Math.seedrandom("x" + indexX + '&' + indexY);
 			star.position.x = indexX - (gridSize.x/biome.stars.densety)/2 + Math.random()*gridSize.x/biome.stars.densety;
 			Math.seedrandom("y" + indexX + '&' + indexY);
 			star.position.y = indexY - (gridSize.y/biome.stars.densety)/2 + Math.random()*gridSize.y/biome.stars.densety;
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
	var seedObj = seed(position.x, position.y);
	Math.seedrandom("biome" + seedObj.index);
	biome = _calculateBiome(Math.random());
	var biomeIntensity = Math.abs(seedObj.value);
	//check existance based on planets.densety
	Math.seedrandom("existance" + position.x + '&' + position.y);
	if (Math.random()<Math.sqrt(gridSize.x*gridSize.y)*biome.planets.densety){
		//set planet values depending on biome
		var planet = {
			color : {
				r : biome.planets.color.r * biomeIntensity + biomes[0].planets.color.r * (1-biomeIntensity),
				g : biome.planets.color.g * biomeIntensity + biomes[0].planets.color.g * (1-biomeIntensity),
				b : biome.planets.color.b * biomeIntensity + biomes[0].planets.color.b * (1-biomeIntensity),
				delta : biome.planets.color.delta * biomeIntensity + biomes[0].planets.color.delta * (1-biomeIntensity)
			}
		};
		//random radius
		seededMaxPlanetSize = biome.planets.maxSize * biomeIntensity + biomes[0].planets.maxSize * (1-biomeIntensity);
	 	seededMinPlanetSize = biome.planets.minSize * biomeIntensity + biomes[0].planets.minSize * (1-biomeIntensity);
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
		if(biome.planets.items){
			for (b=0; b<biome.planets.items.length; b++){
				planet.items.push(biome.planets.items[b]);
				planet.items[b].probability = planet.items[b].probability*biomeIntensity;
				planet.items[b].share = planet.items[b].share*biomeIntensity;
			}
		}
		if(biomes[0].planets.items){
			for (b=0; b<biomes[0].planets.items.length;b++){
				var notInItems = true;
				for (m=0; m<planet.items.length;m++){
					if (biomes[0].planets.items[b].label === planet.items[m].label){
						notInitems = false;
						planet.items[m].probability = planet.items[m].probability + biomes[0].planets.items[b].probability * (1-biomeIntensity);
						planet.items[m].share = planet.items[m].share + biomes[0].planets.items[b].share * (1-biomeIntensity);
						Math.seedrandom(planet.items[m].label + position.x + position.y );
						if (Math.random()>=planet.items[m].probability){
							planet.items.splice(m,1);
						}
					}
				}
				if (notInItems) {
					var newItem = {
						label: biomes[0].planets.items[b].label,
						probability : biomes[0].planets.items[b].probability,
						share : biomes[0].planets.items[b].share
					};
					newItem.probability = newItem.probability*(1-biomeIntensity);
					newItem.share = newItem.share*(1-biomeIntensity);
					Math.seedrandom(newItem.label + position.x + position.y );
					if (Math.random()<newItem.probability){
						planet.items.push(newItem);
					}
				}
			}
		}
		//add to tile
		tiles[ tileIndex ].planets.push(_createPlanet (radius, planet.position, planet.color, planet.items));
	}
};
_visualizeTiles = function(position, tileIndex){
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
	worldGenerator.scene.add(tiles[tileIndex]);
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