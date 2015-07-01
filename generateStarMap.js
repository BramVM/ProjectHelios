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

	scene.add( star );
	star.position.set(position.x,position.y,position.z);
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
var generateWorld = function(origin){
	var rangeX = 1000;
	var rangeY = 1000;
	var indexX = origin.x - rangeX;
	var indexY = origin.y - rangeY;
	var density =100;
	for( indexX ; indexX < origin.x + rangeX ; indexX = indexX  + Math.abs(seed(indexX,0))*100+75 ) {
		for( indexY ; indexY < origin.y + rangeY ; indexY = indexY + Math.abs(seed(indexY,0)*100)+75 ) {
			var radius=0;
			if(indexX+indexY!=0){
				var radiusGenerator = SeedRandom(Math.pow(seed(indexX,indexY),2));
				radius = radiusGenerator(6);
			}
			if (radius!=0){
				var rngPositionX = SeedRandom(Math.abs(indexX+indexY));
				var rngPositionY = SeedRandom(Math.abs(indexY-indexX));
				var rngColor = SeedRandom(Math.abs(indexX-indexY));
				var position = {
					x : indexX + rngPositionX(1000),
					y : indexY + rngPositionY(1000),
					z : -50
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
				console.log(color);
				createStar (radius,position,color);
			}
		}
		indexY = origin.y - rangeY;
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
	