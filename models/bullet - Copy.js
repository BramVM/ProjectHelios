var model = {
	dims : [3,6,2],
	colors : [0x4444ee,0xee4444,0xffffff],
	voxels : [

		0,1,0,
		1,1,1,
		1,1,1,
		0,2,0,
		0,2,0,
		0,2,0,

        0,0,0,
		0,1,0,
		0,3,0,
		0,0,0,
		0,0,0,
		0,0,0

	]
};
if (typeof(module) !== 'undefined') module.exports = model;