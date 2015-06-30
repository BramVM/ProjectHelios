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

	m_w = x;    /* must not be zero, nor 0x464fffff */
	m_z = y;    /* must not be zero, nor 0x9068ffff */

	 m_z = 36969 * (m_z & 65535) + (m_z >> 16);
    m_w = 18000 * (m_w & 65535) + (m_w >> 16);
    return ((m_z << 16) + m_w);  /* 32-bit result */
	//return result;
}
var generateWorld = function(origin){
	var rangeX = 1000;
	var rangeY = 1000;
	var indexX = origin.x - rangeX;
	var indexY = origin.y - rangeY;
	var density =100;
	var radiusGenerator;
	var densityGenerator;
	var seededDensity;
	densityGenerator = SeedRandom(Math.abs(indexX));
	seededDensity = Math.abs(seed(indexX,indexY)/100000000*(10+densityGenerator(40))); //between 100 & 500
	for( indexX ; indexX < origin.x + rangeX ; indexX = indexX  + seededDensity ) {
		for( indexY ; indexY < origin.y + rangeY ; indexY = indexY + seededDensity ) {
			seededDensity = Math.abs(seed(indexX,indexY)/100000000*(10+densityGenerator(40))); //between 100 & 500
			console.log(seededDensity);
			var radius=0;
			if(indexX+indexY!=0){
				radiusGenerator = SeedRandom(Math.pow(seed(indexX,indexY),2));
				radius = radiusGenerator(6);
			}
			//console.log(radius);
			if (radius!=0){
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
	