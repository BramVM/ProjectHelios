var seedrandom = require('seedrandom');
var biomes = require('./biomes');

var _seedBiome = function (x,y){
	var frequency=0.0003;
	sinA=0.5*Math.sin((x-y)*frequency);
	sinB=0.5*Math.sin((x+y)*frequency);
	var indexOfSinA = Math.floor((x)/(Math.PI/frequency))
	var indexOfSinB = Math.floor((y+Math.PI/frequency/2)/(Math.PI/frequency));
	var biomeId = "biome" + indexOfSinA + "" +indexOfSinB;
	Math.seedrandom(biomeId);
	var seededRandom = Math.random();
	Math.seedrandom();
	return {
		//biome : biomes[1],
		biome : _calculateBiome(seededRandom),
		biomeIntensity : Math.abs(sinA+sinB),
		id : biomeId
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

var seeder = {
	seedBiome : _seedBiome
}

if (typeof(module) !== 'undefined') module.exports = seeder;