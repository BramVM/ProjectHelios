var model = {
	dims : [15,15,5],
	colors : [0x8A8A8A,0x000080,0x9FFFE8,0x505050],
	voxels : [

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
        0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
        0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,
        0,0,1,0,0,2,0,0,0,2,0,0,1,0,0,
        0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,
        0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,
        0,2,1,0,0,0,0,0,0,0,0,0,1,2,0,
        0,2,2,0,0,0,0,0,0,0,0,0,2,2,0,
        0,2,2,1,0,0,0,0,0,0,0,1,2,2,0,
        0,2,2,1,0,0,0,0,0,0,0,1,2,2,0,
        0,2,1,0,0,0,0,0,0,0,0,0,1,2,0,
        0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,
        0,0,0,0,2,2,0,0,0,2,2,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

	0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,
        0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,
        0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,
        0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,
        0,0,0,1,2,0,0,0,0,0,2,1,0,0,0,
        0,0,0,1,2,0,0,0,0,0,2,1,0,0,0,
        0,0,0,1,1,0,0,4,0,0,1,1,0,0,0,
        0,0,0,1,1,0,4,4,4,0,1,1,0,0,0,
        0,0,0,1,1,4,4,4,4,4,1,1,0,0,0,
        0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,
        0,0,0,0,1,4,4,4,4,4,1,0,0,0,0,
        0,0,0,1,1,4,4,4,4,4,1,1,0,0,0,
        0,0,0,1,1,4,4,4,4,4,1,1,0,0,0,
        0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,
        0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,
        0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,
        0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,
        0,0,0,0,0,0,4,3,4,0,0,0,0,0,0,
        0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

	],
        collisionDims : [15,15,1],
        collision : [
       
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
        0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,

        ]

}
if (typeof(module) !== 'undefined') module.exports = model;