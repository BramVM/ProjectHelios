var createStar = function(radius,position,color){
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
function seed(x,y){
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

var setGridSize = function (gridMatrixSize,gridSize) {

}

var checkNearestTile = function (position){
	var nearestTilePosition = {};
	nearestTilePosition.x = gridSize.x * Math.round(position.x/gridSize.x);
	nearestTilePosition.y = gridSize.y * Math.round(position.y/gridSize.y);
	return nearestTilePosition;
}
var initWorld = function (position){
	prevTilePos = checkNearestTile(position);
	generateWorld (prevTilePos,true);
}
var updateWorldOnMove = function (position){
	if (checkNearestTile(position).x!=prevTilePos.x||checkNearestTile(position).y!=prevTilePos.y){
		prevTilePos = checkNearestTile(position);
		generateWorld (prevTilePos,false);
	}
}
var generateWorld = function (nearestTilePosition,init){
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
				generateTile(pseudoPosition);
			} 
		}
	}
	for ( l = 0 ; l < tiles.length ; l++ ){	
		if (!tiles[l].stay){
			scene.remove(tiles[l]);
			tiles.splice(l, 1);
		}
	}
}

var generateTile = function(position){
	var tileIndex = tiles.length;
	tiles[ tileIndex] = new THREE.Object3D();
	tiles[ tileIndex].stay=true;
	tiles[ tileIndex].stars = [];
	tiles[ tileIndex].gridPosX = position.x/gridSize.x;
	tiles[ tileIndex].gridPosY = position.y/gridSize.y;

	// var square = new THREE.Shape();
 //    square.moveTo(-gridSize.x/2+5, -gridSize.y/2+5);
 //    square.lineTo(-gridSize.x/2+5, gridSize.y/2-5);
 //    square.lineTo(gridSize.x/2-5, gridSize.y/2-5);
 //    square.lineTo(gridSize.x/2-5, -gridSize.y/2+5);
 //    square.lineTo(-gridSize.x/2+5, -gridSize.y/2+5);

	// var geometry = square.makeGeometry();
	// var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.3});
	// var square = new THREE.Mesh(geometry, material);
	// square.position.set(position.x,position.y,-500);
	// var wireframe = new THREE.WireframeHelper( square, 0xffffff );
	
	// tiles[ tileIndex ].stars.push(square);
	// tiles[ tileIndex ].stars.push(wireframe);

	var indexX = position.x - gridSize.x/2;
	var indexY = position.y - gridSize.y/2;
	var density =100;
	for( indexX ; indexX < position.x + gridSize.x/2 ; indexX = indexX  + Math.abs(seed(indexX,0))*100+75 ) {
		for( indexY ; indexY < position.y + gridSize.y/2 ; indexY = indexY + Math.abs(seed(indexY,0)*100)+75 ) {
	 		var radius=0;
	 		if(indexX+indexY!=0){
	 			var radiusGenerator = SeedRandom(Math.pow(seed(indexX,indexY),2));
	 			radius = radiusGenerator(6);
	 		}
	 		if (radius!=0){
	 			var rngPositionX = SeedRandom(Math.abs(indexX+indexY));
	 			var rngPositionY = SeedRandom(Math.abs(indexY-indexX));
	 			var rngColor = SeedRandom(Math.abs(indexX-indexY));
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
	 			tiles[ tileIndex ].stars.push(createStar (radius,starPosition,color));
	 		}
	 	}
		indexY = position.y - gridSize.y/2;
	}
	//add all stars to scene
	scene.add(tiles[tileIndex]);
	for ( k = 0 ; k < tiles[tileIndex].stars.length ; k++ ){
		tiles[tileIndex].add(tiles[tileIndex].stars[k]);
	}
}

function SeedRandom(state1,state2){
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
	