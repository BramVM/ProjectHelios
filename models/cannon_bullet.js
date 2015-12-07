var model = {
	dims : [6,5,2],
	colors : [0xffffff,0xff9999,0xff6666],
	voxels : [

		0,1,1,1,1,0,
		1,1,2,2,2,1,
		1,2,2,2,2,1,
		2,2,3,3,3,2,
		3,3,0,0,3,3,

        0,1,1,1,1,0,
		1,1,2,2,2,1,
		1,2,2,2,2,1,
		2,2,3,3,3,2,
		3,3,0,0,3,3,

	]
};
if (typeof(module) !== 'undefined') module.exports = model;