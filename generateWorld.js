var createStar = function(radius,position){
	var circle = new THREE.Shape();
	for (var i = 0; i < 16; i++) {
	  var pct = (i + 1) / 16;
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
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	var star = new THREE.Mesh(geometry, material);

	scene.add( star );
	star.position.set(position.x,position.y,position.z);
}
function seed(x,y){
	var i=x+y;
	var k=x-y;
	var frequency=0.006;
	var amplitude=0.00001;
	var result=0;
	result=amplitude*Math.sin(i*frequency);
	result=result+amplitude*Math.sin(k*frequency);
	return result;
}
var generateWorld = function(origin){
	var rangeX = 500;
	var rangeY = 500;
	var indexX = origin.x - rangeX;
	var indexY = origin.y - rangeY;
	var densety = 20;


		for( indexX ; indexX < origin.x + rangeX ; indexX = indexX  + densety ) {
			for( indexY ; indexY < origin.y + rangeY ; indexY = indexY + densety ) {
				var radius = seed(indexX,indexY)*100000 ;
				if (radius!=0){
					//console.log(radius);
					var position = {
						x : indexX,
						y : indexY,
						z : -50
					}
					createStar (radius,position);
				}
			}
			indexY = origin.y - rangeY;
		}
}
	