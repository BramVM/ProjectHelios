var seedrandom = require('seedrandom');
var biomes = require('./biomes');

var _seedBiome = function (x,y){
	var frequency=0.0007;
	var newSin;
	var result=0;
	sinA=0.5*Math.sin(x*frequency);
	sinB=0.5*Math.sin(y*frequency);
	var indexOfSin = Math.floor(x/(Math.PI/frequency))+Math.floor(y/(Math.PI/frequency));
	Math.seedrandom("biome" + indexOfSin);
	return {
		biome : _calculateBiome(Math.random()),
		biomeIntensity : Math.abs(sinA+sinB)
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