




var bulletVoxels = [
	{position: [0,3,1], color: "4444ee"},
	{position: [0,2,1], color: "ffffff"},

	{position: [0,4,0], color: "4444ee"},
	{position: [1,3,0], color: "4444ee"},
	{position: [-1,3,0], color: "4444ee"},
	{position: [1,2,0], color: "4444ee"},
	{position: [-1,2,0], color: "4444ee"},
	{position: [0,1,0], color: "ee4444"},
	{position: [0,0,0], color: "ee4444"},
	{position: [0,-1,0], color: "ee4444"}
];
var ship = [

	//base
	{position: [-7,-6,0], color: "eae3cf"},
	{position: [0,-6,0], color: "eae3cf"},
	{position: [7,-6,0], color: "eae3cf"},

	{position: [-7,-5,0], color: "eae3cf"},
	{position: [-6,-5,0], color: "eae3cf"},
	{position: [-3,-5,0], color: "ee4444"},
	{position: [-2,-5,0], color: "ee4444"},
	{position: [0,-5,0], color: "eae3cf"},
	{position: [2,-5,0], color: "ee4444"},
	{position: [7,-5,0], color: "eae3cf"},
	{position: [6,-5,0], color: "eae3cf"},
	{position: [3,-5,0], color: "ee4444"},

	{position: [-7,-4,0], color: "eae3cf"},
	{position: [-6,-4,0], color: "eae3cf"},
	{position: [-5,-4,0], color: "eae3cf"},
	{position: [-3,-4,0], color: "ee4444"},
	{position: [-2,-4,0], color: "ee4444"},
	{position: [-1,-4,0], color: "eae3cf"},
	{position: [0,-4,0], color: "eae3cf"},
	{position: [1,-4,0], color: "eae3cf"},
	{position: [2,-4,0], color: "ee4444"},
	{position: [3,-4,0], color: "ee4444"},
	{position: [5,-4,0], color: "eae3cf"},
	{position: [6,-4,0], color: "eae3cf"},
	{position: [7,-4,0], color: "eae3cf"},

	{position: [-7,-3,0], color: "eae3cf"},
	{position: [-6,-3,0], color: "eae3cf"},
	{position: [-5,-3,0], color: "eae3cf"},
	{position: [-3,-3,0], color: "ee4444"},
	{position: [-2,-3,0], color: "ee4444"},
	{position: [-1,-3,0], color: "eae3cf"},
	{position: [0,-3,0], color: "eae3cf"},
	{position: [1,-3,0], color: "eae3cf"},
	{position: [2,-3,0], color: "ee4444"},
	{position: [3,-3,0], color: "ee4444"},
	{position: [4,-3,0], color: "eae3cf"},
	{position: [5,-3,0], color: "eae3cf"},
	{position: [6,-3,0], color: "eae3cf"},
	{position: [7,-3,0], color: "eae3cf"},

	{position: [-7,-2,0], color: "eae3cf"},
	{position: [-5,-2,0], color: "eae3cf"},
	{position: [-4,-2,0], color: "eae3cf"},
	{position: [-3,-2,0], color: "eae3cf"},
	{position: [-2,-2,0], color: "ee4444"},
	{position: [-1,-2,0], color: "eae3cf"},
	{position: [0,-2,0], color: "eae3cf"},
	{position: [1,-2,0], color: "eae3cf"},
	{position: [2,-2,0], color: "ee4444"},
	{position: [3,-2,0], color: "eae3cf"},
	{position: [4,-2,0], color: "eae3cf"},
	{position: [5,-2,0], color: "eae3cf"},
	{position: [7,-2,0], color: "eae3cf"},

	{position: [-7,-1,0], color: "eae3cf"},
	{position: [-4,-1,0], color: "eae3cf"},
	{position: [-3,-1,0], color: "eae3cf"},
	{position: [-2,-1,0], color: "eae3cf"},
	{position: [-1,-1,0], color: "eae3cf"},
	{position: [0,-1,0], color: "eae3cf"},
	{position: [1,-1,0], color: "eae3cf"},
	{position: [2,-1,0], color: "eae3cf"},
	{position: [3,-1,0], color: "eae3cf"},
	{position: [4,-1,0], color: "eae3cf"},
	{position: [7,-1,0], color: "eae3cf"},

	{position: [-7,0,0], color: "ee4444"},
	{position: [-4,0,0], color: "eae3cf"},
	{position: [-3,0,0], color: "eae3cf"},
	{position: [-2,0,0], color: "eae3cf"},
	{position: [-1,0,0], color: "eae3cf"},
	{position: [0,0,0], color: "eae3cf"},
	{position: [1,0,0], color: "eae3cf"},
	{position: [2,0,0], color: "eae3cf"},
	{position: [3,0,0], color: "eae3cf"},
	{position: [4,0,0], color: "eae3cf"},
	{position: [7,0,0], color: "ee4444"},

	{position: [-7,-1,0], color: "ee4444"},
	{position: [-4,1,0], color: "eae3cf"},
	{position: [-3,1,0], color: "eae3cf"},
	{position: [-2,1,0], color: "eae3cf"},
	{position: [-1,1,0], color: "eae3cf"},
	{position: [0,1,0], color: "eae3cf"},
	{position: [1,1,0], color: "eae3cf"},
	{position: [2,1,0], color: "eae3cf"},
	{position: [3,1,0], color: "eae3cf"},
	{position: [4,1,0], color: "eae3cf"},
	{position: [7,1,0], color: "ee4444"},

	{position: [-4,2,0], color: "eae3cf"},
	{position: [-2,2,0], color: "eae3cf"},
	{position: [-1,2,0], color: "eae3cf"},
	{position: [0,2,0], color: "eae3cf"},
	{position: [1,2,0], color: "eae3cf"},
	{position: [2,2,0], color: "eae3cf"},
	{position: [4,2,0], color: "eae3cf"},

	{position: [-4,3,0], color: "ee4444"},
	{position: [-1,3,0], color: "eae3cf"},
	{position: [0,3,0], color: "eae3cf"},
	{position: [1,3,0], color: "eae3cf"},
	{position: [4,3,0], color: "ee4444"},

	{position: [-4,4,0], color: "ee4444"},
	{position: [-1,4,0], color: "eae3cf"},
	{position: [0,4,0], color: "eae3cf"},
	{position: [1,4,0], color: "eae3cf"},
	{position: [4,4,0], color: "ee4444"},

	{position: [-1,5,0], color: "eae3cf"},
	{position: [0,5,0], color: "eae3cf"},
	{position: [1,5,0], color: "eae3cf"},

	{position: [0,6,0], color: "eae3cf"},

	{position: [0,7,0], color: "eae3cf"},
	
	//lvl2
	{position: [0,-6,1], color: "eae3cf"},

	{position: [-2,-5,1], color: "ee4444"},
	{position: [0,-5,1], color: "eae3cf"},
	{position: [2,-5,1], color: "ee4444"},

	{position: [-2,-4,1], color: "ee4444"},
	{position: [0,-4,1], color: "eae3cf"},
	{position: [2,-4,1], color: "ee4444"},

	{position: [-6,-3,1], color: "eae3cf"},
	{position: [-5,-3,1], color: "eae3cf"},
	{position: [-4,-3,1], color: "eae3cf"},
	{position: [-3,-3,1], color: "eae3cf"},
	{position: [-2,-3,1], color: "ee4444"},
	{position: [-1,-3,1], color: "eae3cf"},
	{position: [0,-3,1], color: "eae3cf"},
	{position: [1,-3,1], color: "eae3cf"},
	{position: [2,-3,1], color: "ee4444"},
	{position: [3,-3,1], color: "eae3cf"},
	{position: [4,-3,1], color: "eae3cf"},
	{position: [5,-3,1], color: "eae3cf"},
	{position: [6,-3,1], color: "eae3cf"},

	{position: [-5,-2,1], color: "eae3cf"},
	{position: [-4,-2,1], color: "eae3cf"},
	{position: [-3,-2,1], color: "eae3cf"},
	{position: [-2,-2,1], color: "eae3cf"},
	{position: [-1,-2,1], color: "eae3cf"},
	{position: [0,-2,1], color: "eae3cf"},
	{position: [1,-2,1], color: "eae3cf"},
	{position: [2,-2,1], color: "eae3cf"},
	{position: [3,-2,1], color: "eae3cf"},
	{position: [4,-2,1], color: "eae3cf"},
	{position: [5,-2,1], color: "eae3cf"},

	{position: [-4,-1,1], color: "eae3cf"},
	{position: [-3,-1,1], color: "eae3cf"},
	{position: [-2,-1,1], color: "eae3cf"},
	{position: [-1,-1,1], color: "eae3cf"},
	{position: [0,-1,1], color: "eae3cf"},
	{position: [1,-1,1], color: "eae3cf"},
	{position: [2,-1,1], color: "eae3cf"},
	{position: [3,-1,1], color: "eae3cf"},
	{position: [4,-1,1], color: "eae3cf"},

	{position: [-4,0,1], color: "4444ee"},
	{position: [-3,0,1], color: "eae3cf"},
	{position: [-2,0,1], color: "eae3cf"},
	{position: [-1,0,1], color: "eae3cf"},
	{position: [0,0,1], color: "eae3cf"},
	{position: [1,0,1], color: "eae3cf"},
	{position: [2,0,1], color: "eae3cf"},
	{position: [3,0,1], color: "eae3cf"},
	{position: [4,0,1], color: "4444ee"},

	{position: [-3,1,1], color: "4444ee"},
	{position: [-2,1,1], color: "eae3cf"},
	{position: [-1,1,1], color: "eae3cf"},
	{position: [0,1,1], color: "eae3cf"},
	{position: [1,1,1], color: "eae3cf"},
	{position: [2,1,1], color: "eae3cf"},
	{position: [3,1,1], color: "4444ee"},

	{position: [-2,2,1], color: "eae3cf"},
	{position: [-1,2,1], color: "eae3cf"},
	{position: [0,2,1], color: "eae3cf"},
	{position: [1,2,1], color: "eae3cf"},
	{position: [2,2,1], color: "eae3cf"},

	{position: [-1,3,1], color: "eae3cf"},
	{position: [0,3,1], color: "eae3cf"},
	{position: [1,3,1], color: "eae3cf"},

	{position: [0,4,1], color: "eae3cf"},

	{position: [0,5,1], color: "eae3cf"},

	{position: [0,6,1], color: "eae3cf"},

	//lvl3
	{position: [0,-5,2], color: "eae3cf"},

	{position: [0,-6,2], color: "eae3cf"},

	{position: [-1,-1,2], color: "ee4444"},
	{position: [1,-1,2], color: "ee4444"},

	{position: [-1,0,2], color: "ee4444"},
	{position: [0,0,2], color: "ee4444"},
	{position: [1,0,2], color: "ee4444"},

	{position: [0,1,2], color: "ee4444"},

	//lv4
	{position: [0,-6,3], color: "eae3cf"},

];
var bulletVoxels=[{position:[0,3,1],color:"4444ee"},{position:[0,2,1],color:"ffffff"},{position:[0,4,0],color:"4444ee"},{position:[1,3,0],color:"4444ee"},{position:[-1,3,0],color:"4444ee"},{position:[1,2,0],color:"4444ee"},{position:[-1,2,0],color:"4444ee"},{position:[0,1,0],color:"ee4444"},{position:[0,0,0],color:"ee4444"},{position:[0,-1,0],color:"ee4444"}];var ship=[{position:[-7,-6,0],color:"eae3cf"},{position:[0,-6,0],color:"eae3cf"},{position:[7,-6,0],color:"eae3cf"},{position:[-7,-5,0],color:"eae3cf"},{position:[-6,-5,0],color:"eae3cf"},{position:[-3,-5,0],color:"ee4444"},{position:[-2,-5,0],color:"ee4444"},{position:[0,-5,0],color:"eae3cf"},{position:[2,-5,0],color:"ee4444"},{position:[7,-5,0],color:"eae3cf"},{position:[6,-5,0],color:"eae3cf"},{position:[3,-5,0],color:"ee4444"},{position:[-7,-4,0],color:"eae3cf"},{position:[-6,-4,0],color:"eae3cf"},{position:[-5,-4,0],color:"eae3cf"},{position:[-3,-4,0],color:"ee4444"},{position:[-2,-4,0],color:"ee4444"},{position:[-1,-4,0],color:"eae3cf"},{position:[0,-4,0],color:"eae3cf"},{position:[1,-4,0],color:"eae3cf"},{position:[2,-4,0],color:"ee4444"},{position:[3,-4,0],color:"ee4444"},{position:[5,-4,0],color:"eae3cf"},{position:[6,-4,0],color:"eae3cf"},{position:[7,-4,0],color:"eae3cf"},{position:[-7,-3,0],color:"eae3cf"},{position:[-6,-3,0],color:"eae3cf"},{position:[-5,-3,0],color:"eae3cf"},{position:[-3,-3,0],color:"ee4444"},{position:[-2,-3,0],color:"ee4444"},{position:[-1,-3,0],color:"eae3cf"},{position:[0,-3,0],color:"eae3cf"},{position:[1,-3,0],color:"eae3cf"},{position:[2,-3,0],color:"ee4444"},{position:[3,-3,0],color:"ee4444"},{position:[4,-3,0],color:"eae3cf"},{position:[5,-3,0],color:"eae3cf"},{position:[6,-3,0],color:"eae3cf"},{position:[7,-3,0],color:"eae3cf"},{position:[-7,-2,0],color:"eae3cf"},{position:[-5,-2,0],color:"eae3cf"},{position:[-4,-2,0],color:"eae3cf"},{position:[-3,-2,0],color:"eae3cf"},{position:[-2,-2,0],color:"ee4444"},{position:[-1,-2,0],color:"eae3cf"},{position:[0,-2,0],color:"eae3cf"},{position:[1,-2,0],color:"eae3cf"},{position:[2,-2,0],color:"ee4444"},{position:[3,-2,0],color:"eae3cf"},{position:[4,-2,0],color:"eae3cf"},{position:[5,-2,0],color:"eae3cf"},{position:[7,-2,0],color:"eae3cf"},{position:[-7,-1,0],color:"eae3cf"},{position:[-4,-1,0],color:"eae3cf"},{position:[-3,-1,0],color:"eae3cf"},{position:[-2,-1,0],color:"eae3cf"},{position:[-1,-1,0],color:"eae3cf"},{position:[0,-1,0],color:"eae3cf"},{position:[1,-1,0],color:"eae3cf"},{position:[2,-1,0],color:"eae3cf"},{position:[3,-1,0],color:"eae3cf"},{position:[4,-1,0],color:"eae3cf"},{position:[7,-1,0],color:"eae3cf"},{position:[-7,0,0],color:"ee4444"},{position:[-4,0,0],color:"eae3cf"},{position:[-3,0,0],color:"eae3cf"},{position:[-2,0,0],color:"eae3cf"},{position:[-1,0,0],color:"eae3cf"},{position:[0,0,0],color:"eae3cf"},{position:[1,0,0],color:"eae3cf"},{position:[2,0,0],color:"eae3cf"},{position:[3,0,0],color:"eae3cf"},{position:[4,0,0],color:"eae3cf"},{position:[7,0,0],color:"ee4444"},{position:[-7,-1,0],color:"ee4444"},{position:[-4,1,0],color:"eae3cf"},{position:[-3,1,0],color:"eae3cf"},{position:[-2,1,0],color:"eae3cf"},{position:[-1,1,0],color:"eae3cf"},{position:[0,1,0],color:"eae3cf"},{position:[1,1,0],color:"eae3cf"},{position:[2,1,0],color:"eae3cf"},{position:[3,1,0],color:"eae3cf"},{position:[4,1,0],color:"eae3cf"},{position:[7,1,0],color:"ee4444"},{position:[-4,2,0],color:"eae3cf"},{position:[-2,2,0],color:"eae3cf"},{position:[-1,2,0],color:"eae3cf"},{position:[0,2,0],color:"eae3cf"},{position:[1,2,0],color:"eae3cf"},{position:[2,2,0],color:"eae3cf"},{position:[4,2,0],color:"eae3cf"},{position:[-4,3,0],color:"ee4444"},{position:[-1,3,0],color:"eae3cf"},{position:[0,3,0],color:"eae3cf"},{position:[1,3,0],color:"eae3cf"},{position:[4,3,0],color:"ee4444"},{position:[-4,4,0],color:"ee4444"},{position:[-1,4,0],color:"eae3cf"},{position:[0,4,0],color:"eae3cf"},{position:[1,4,0],color:"eae3cf"},{position:[4,4,0],color:"ee4444"},{position:[-1,5,0],color:"eae3cf"},{position:[0,5,0],color:"eae3cf"},{position:[1,5,0],color:"eae3cf"},{position:[0,6,0],color:"eae3cf"},{position:[0,7,0],color:"eae3cf"},{position:[0,-6,1],color:"eae3cf"},{position:[-2,-5,1],color:"ee4444"},{position:[0,-5,1],color:"eae3cf"},{position:[2,-5,1],color:"ee4444"},{position:[-2,-4,1],color:"ee4444"},{position:[0,-4,1],color:"eae3cf"},{position:[2,-4,1],color:"ee4444"},{position:[-6,-3,1],color:"eae3cf"},{position:[-5,-3,1],color:"eae3cf"},{position:[-4,-3,1],color:"eae3cf"},{position:[-3,-3,1],color:"eae3cf"},{position:[-2,-3,1],color:"ee4444"},{position:[-1,-3,1],color:"eae3cf"},{position:[0,-3,1],color:"eae3cf"},{position:[1,-3,1],color:"eae3cf"},{position:[2,-3,1],color:"ee4444"},{position:[3,-3,1],color:"eae3cf"},{position:[4,-3,1],color:"eae3cf"},{position:[5,-3,1],color:"eae3cf"},{position:[6,-3,1],color:"eae3cf"},{position:[-5,-2,1],color:"eae3cf"},{position:[-4,-2,1],color:"eae3cf"},{position:[-3,-2,1],color:"eae3cf"},{position:[-2,-2,1],color:"eae3cf"},{position:[-1,-2,1],color:"eae3cf"},{position:[0,-2,1],color:"eae3cf"},{position:[1,-2,1],color:"eae3cf"},{position:[2,-2,1],color:"eae3cf"},{position:[3,-2,1],color:"eae3cf"},{position:[4,-2,1],color:"eae3cf"},{position:[5,-2,1],color:"eae3cf"},{position:[-4,-1,1],color:"eae3cf"},{position:[-3,-1,1],color:"eae3cf"},{position:[-2,-1,1],color:"eae3cf"},{position:[-1,-1,1],color:"eae3cf"},{position:[0,-1,1],color:"eae3cf"},{position:[1,-1,1],color:"eae3cf"},{position:[2,-1,1],color:"eae3cf"},{position:[3,-1,1],color:"eae3cf"},{position:[4,-1,1],color:"eae3cf"},{position:[-4,0,1],color:"4444ee"},{position:[-3,0,1],color:"eae3cf"},{position:[-2,0,1],color:"eae3cf"},{position:[-1,0,1],color:"eae3cf"},{position:[0,0,1],color:"eae3cf"},{position:[1,0,1],color:"eae3cf"},{position:[2,0,1],color:"eae3cf"},{position:[3,0,1],color:"eae3cf"},{position:[4,0,1],color:"4444ee"},{position:[-3,1,1],color:"4444ee"},{position:[-2,1,1],color:"eae3cf"},{position:[-1,1,1],color:"eae3cf"},{position:[0,1,1],color:"eae3cf"},{position:[1,1,1],color:"eae3cf"},{position:[2,1,1],color:"eae3cf"},{position:[3,1,1],color:"4444ee"},{position:[-2,2,1],color:"eae3cf"},{position:[-1,2,1],color:"eae3cf"},{position:[0,2,1],color:"eae3cf"},{position:[1,2,1],color:"eae3cf"},{position:[2,2,1],color:"eae3cf"},{position:[-1,3,1],color:"eae3cf"},{position:[0,3,1],color:"eae3cf"},{position:[1,3,1],color:"eae3cf"},{position:[0,4,1],color:"eae3cf"},{position:[0,5,1],color:"eae3cf"},{position:[0,6,1],color:"eae3cf"},{position:[0,-5,2],color:"eae3cf"},{position:[0,-6,2],color:"eae3cf"},{position:[-1,-1,2],color:"ee4444"},{position:[1,-1,2],color:"ee4444"},{position:[-1,0,2],color:"ee4444"},{position:[0,0,2],color:"ee4444"},{position:[1,0,2],color:"ee4444"},{position:[0,1,2],color:"ee4444"},{position:[0,-6,3],color:"eae3cf"}];
var bulletVoxels=[{position:[0,3,1],color:"4444ee"},{position:[0,2,1],color:"ffffff"},{position:[0,4,0],color:"4444ee"},{position:[1,3,0],color:"4444ee"},{position:[-1,3,0],color:"4444ee"},{position:[1,2,0],color:"4444ee"},{position:[-1,2,0],color:"4444ee"},{position:[0,1,0],color:"ee4444"},{position:[0,0,0],color:"ee4444"},{position:[0,-1,0],color:"ee4444"}];var ship=[{position:[-7,-6,0],color:"eae3cf"},{position:[0,-6,0],color:"eae3cf"},{position:[7,-6,0],color:"eae3cf"},{position:[-7,-5,0],color:"eae3cf"},{position:[-6,-5,0],color:"eae3cf"},{position:[-3,-5,0],color:"ee4444"},{position:[-2,-5,0],color:"ee4444"},{position:[0,-5,0],color:"eae3cf"},{position:[2,-5,0],color:"ee4444"},{position:[7,-5,0],color:"eae3cf"},{position:[6,-5,0],color:"eae3cf"},{position:[3,-5,0],color:"ee4444"},{position:[-7,-4,0],color:"eae3cf"},{position:[-6,-4,0],color:"eae3cf"},{position:[-5,-4,0],color:"eae3cf"},{position:[-3,-4,0],color:"ee4444"},{position:[-2,-4,0],color:"ee4444"},{position:[-1,-4,0],color:"eae3cf"},{position:[0,-4,0],color:"eae3cf"},{position:[1,-4,0],color:"eae3cf"},{position:[2,-4,0],color:"ee4444"},{position:[3,-4,0],color:"ee4444"},{position:[5,-4,0],color:"eae3cf"},{position:[6,-4,0],color:"eae3cf"},{position:[7,-4,0],color:"eae3cf"},{position:[-7,-3,0],color:"eae3cf"},{position:[-6,-3,0],color:"eae3cf"},{position:[-5,-3,0],color:"eae3cf"},{position:[-3,-3,0],color:"ee4444"},{position:[-2,-3,0],color:"ee4444"},{position:[-1,-3,0],color:"eae3cf"},{position:[0,-3,0],color:"eae3cf"},{position:[1,-3,0],color:"eae3cf"},{position:[2,-3,0],color:"ee4444"},{position:[3,-3,0],color:"ee4444"},{position:[4,-3,0],color:"eae3cf"},{position:[5,-3,0],color:"eae3cf"},{position:[6,-3,0],color:"eae3cf"},{position:[7,-3,0],color:"eae3cf"},{position:[-7,-2,0],color:"eae3cf"},{position:[-5,-2,0],color:"eae3cf"},{position:[-4,-2,0],color:"eae3cf"},{position:[-3,-2,0],color:"eae3cf"},{position:[-2,-2,0],color:"ee4444"},{position:[-1,-2,0],color:"eae3cf"},{position:[0,-2,0],color:"eae3cf"},{position:[1,-2,0],color:"eae3cf"},{position:[2,-2,0],color:"ee4444"},{position:[3,-2,0],color:"eae3cf"},{position:[4,-2,0],color:"eae3cf"},{position:[5,-2,0],color:"eae3cf"},{position:[7,-2,0],color:"eae3cf"},{position:[-7,-1,0],color:"eae3cf"},{position:[-4,-1,0],color:"eae3cf"},{position:[-3,-1,0],color:"eae3cf"},{position:[-2,-1,0],color:"eae3cf"},{position:[-1,-1,0],color:"eae3cf"},{position:[0,-1,0],color:"eae3cf"},{position:[1,-1,0],color:"eae3cf"},{position:[2,-1,0],color:"eae3cf"},{position:[3,-1,0],color:"eae3cf"},{position:[4,-1,0],color:"eae3cf"},{position:[7,-1,0],color:"eae3cf"},{position:[-7,0,0],color:"ee4444"},{position:[-4,0,0],color:"eae3cf"},{position:[-3,0,0],color:"eae3cf"},{position:[-2,0,0],color:"eae3cf"},{position:[-1,0,0],color:"eae3cf"},{position:[0,0,0],color:"eae3cf"},{position:[1,0,0],color:"eae3cf"},{position:[2,0,0],color:"eae3cf"},{position:[3,0,0],color:"eae3cf"},{position:[4,0,0],color:"eae3cf"},{position:[7,0,0],color:"ee4444"},{position:[-7,-1,0],color:"ee4444"},{position:[-4,1,0],color:"eae3cf"},{position:[-3,1,0],color:"eae3cf"},{position:[-2,1,0],color:"eae3cf"},{position:[-1,1,0],color:"eae3cf"},{position:[0,1,0],color:"eae3cf"},{position:[1,1,0],color:"eae3cf"},{position:[2,1,0],color:"eae3cf"},{position:[3,1,0],color:"eae3cf"},{position:[4,1,0],color:"eae3cf"},{position:[7,1,0],color:"ee4444"},{position:[-4,2,0],color:"eae3cf"},{position:[-2,2,0],color:"eae3cf"},{position:[-1,2,0],color:"eae3cf"},{position:[0,2,0],color:"eae3cf"},{position:[1,2,0],color:"eae3cf"},{position:[2,2,0],color:"eae3cf"},{position:[4,2,0],color:"eae3cf"},{position:[-4,3,0],color:"ee4444"},{position:[-1,3,0],color:"eae3cf"},{position:[0,3,0],color:"eae3cf"},{position:[1,3,0],color:"eae3cf"},{position:[4,3,0],color:"ee4444"},{position:[-4,4,0],color:"ee4444"},{position:[-1,4,0],color:"eae3cf"},{position:[0,4,0],color:"eae3cf"},{position:[1,4,0],color:"eae3cf"},{position:[4,4,0],color:"ee4444"},{position:[-1,5,0],color:"eae3cf"},{position:[0,5,0],color:"eae3cf"},{position:[1,5,0],color:"eae3cf"},{position:[0,6,0],color:"eae3cf"},{position:[0,7,0],color:"eae3cf"},{position:[0,-6,1],color:"eae3cf"},{position:[-2,-5,1],color:"ee4444"},{position:[0,-5,1],color:"eae3cf"},{position:[2,-5,1],color:"ee4444"},{position:[-2,-4,1],color:"ee4444"},{position:[0,-4,1],color:"eae3cf"},{position:[2,-4,1],color:"ee4444"},{position:[-6,-3,1],color:"eae3cf"},{position:[-5,-3,1],color:"eae3cf"},{position:[-4,-3,1],color:"eae3cf"},{position:[-3,-3,1],color:"eae3cf"},{position:[-2,-3,1],color:"ee4444"},{position:[-1,-3,1],color:"eae3cf"},{position:[0,-3,1],color:"eae3cf"},{position:[1,-3,1],color:"eae3cf"},{position:[2,-3,1],color:"ee4444"},{position:[3,-3,1],color:"eae3cf"},{position:[4,-3,1],color:"eae3cf"},{position:[5,-3,1],color:"eae3cf"},{position:[6,-3,1],color:"eae3cf"},{position:[-5,-2,1],color:"eae3cf"},{position:[-4,-2,1],color:"eae3cf"},{position:[-3,-2,1],color:"eae3cf"},{position:[-2,-2,1],color:"eae3cf"},{position:[-1,-2,1],color:"eae3cf"},{position:[0,-2,1],color:"eae3cf"},{position:[1,-2,1],color:"eae3cf"},{position:[2,-2,1],color:"eae3cf"},{position:[3,-2,1],color:"eae3cf"},{position:[4,-2,1],color:"eae3cf"},{position:[5,-2,1],color:"eae3cf"},{position:[-4,-1,1],color:"eae3cf"},{position:[-3,-1,1],color:"eae3cf"},{position:[-2,-1,1],color:"eae3cf"},{position:[-1,-1,1],color:"eae3cf"},{position:[0,-1,1],color:"eae3cf"},{position:[1,-1,1],color:"eae3cf"},{position:[2,-1,1],color:"eae3cf"},{position:[3,-1,1],color:"eae3cf"},{position:[4,-1,1],color:"eae3cf"},{position:[-4,0,1],color:"4444ee"},{position:[-3,0,1],color:"eae3cf"},{position:[-2,0,1],color:"eae3cf"},{position:[-1,0,1],color:"eae3cf"},{position:[0,0,1],color:"eae3cf"},{position:[1,0,1],color:"eae3cf"},{position:[2,0,1],color:"eae3cf"},{position:[3,0,1],color:"eae3cf"},{position:[4,0,1],color:"4444ee"},{position:[-3,1,1],color:"4444ee"},{position:[-2,1,1],color:"eae3cf"},{position:[-1,1,1],color:"eae3cf"},{position:[0,1,1],color:"eae3cf"},{position:[1,1,1],color:"eae3cf"},{position:[2,1,1],color:"eae3cf"},{position:[3,1,1],color:"4444ee"},{position:[-2,2,1],color:"eae3cf"},{position:[-1,2,1],color:"eae3cf"},{position:[0,2,1],color:"eae3cf"},{position:[1,2,1],color:"eae3cf"},{position:[2,2,1],color:"eae3cf"},{position:[-1,3,1],color:"eae3cf"},{position:[0,3,1],color:"eae3cf"},{position:[1,3,1],color:"eae3cf"},{position:[0,4,1],color:"eae3cf"},{position:[0,5,1],color:"eae3cf"},{position:[0,6,1],color:"eae3cf"},{position:[0,-5,2],color:"eae3cf"},{position:[0,-6,2],color:"eae3cf"},{position:[-1,-1,2],color:"ee4444"},{position:[1,-1,2],color:"ee4444"},{position:[-1,0,2],color:"ee4444"},{position:[0,0,2],color:"ee4444"},{position:[1,0,2],color:"ee4444"},{position:[0,1,2],color:"ee4444"},{position:[0,-6,3],color:"eae3cf"},];
var bulletVoxels = [
	{position: [0,3,1], color: "4444ee"},
	{position: [0,2,1], color: "ffffff"},

	{position: [0,4,0], color: "4444ee"},
	{position: [1,3,0], color: "4444ee"},
	{position: [-1,3,0], color: "4444ee"},
	{position: [1,2,0], color: "4444ee"},
	{position: [-1,2,0], color: "4444ee"},
	{position: [0,1,0], color: "ee4444"},
	{position: [0,0,0], color: "ee4444"},
	{position: [0,-1,0], color: "ee4444"}
];
var ship = [

	//base
	{position: [-7,-6,0], color: "eae3cf"},
	{position: [0,-6,0], color: "eae3cf"},
	{position: [7,-6,0], color: "eae3cf"},

	{position: [-7,-5,0], color: "eae3cf"},
	{position: [-6,-5,0], color: "eae3cf"},
	{position: [-3,-5,0], color: "ee4444"},
	{position: [-2,-5,0], color: "ee4444"},
	{position: [0,-5,0], color: "eae3cf"},
	{position: [2,-5,0], color: "ee4444"},
	{position: [7,-5,0], color: "eae3cf"},
	{position: [6,-5,0], color: "eae3cf"},
	{position: [3,-5,0], color: "ee4444"},

	{position: [-7,-4,0], color: "eae3cf"},
	{position: [-6,-4,0], color: "eae3cf"},
	{position: [-5,-4,0], color: "eae3cf"},
	{position: [-3,-4,0], color: "ee4444"},
	{position: [-2,-4,0], color: "ee4444"},
	{position: [-1,-4,0], color: "eae3cf"},
	{position: [0,-4,0], color: "eae3cf"},
	{position: [1,-4,0], color: "eae3cf"},
	{position: [2,-4,0], color: "ee4444"},
	{position: [3,-4,0], color: "ee4444"},
	{position: [5,-4,0], color: "eae3cf"},
	{position: [6,-4,0], color: "eae3cf"},
	{position: [7,-4,0], color: "eae3cf"},

	{position: [-7,-3,0], color: "eae3cf"},
	{position: [-6,-3,0], color: "eae3cf"},
	{position: [-5,-3,0], color: "eae3cf"},
	{position: [-3,-3,0], color: "ee4444"},
	{position: [-2,-3,0], color: "ee4444"},
	{position: [-1,-3,0], color: "eae3cf"},
	{position: [0,-3,0], color: "eae3cf"},
	{position: [1,-3,0], color: "eae3cf"},
	{position: [2,-3,0], color: "ee4444"},
	{position: [3,-3,0], color: "ee4444"},
	{position: [4,-3,0], color: "eae3cf"},
	{position: [5,-3,0], color: "eae3cf"},
	{position: [6,-3,0], color: "eae3cf"},
	{position: [7,-3,0], color: "eae3cf"},

	{position: [-7,-2,0], color: "eae3cf"},
	{position: [-5,-2,0], color: "eae3cf"},
	{position: [-4,-2,0], color: "eae3cf"},
	{position: [-3,-2,0], color: "eae3cf"},
	{position: [-2,-2,0], color: "ee4444"},
	{position: [-1,-2,0], color: "eae3cf"},
	{position: [0,-2,0], color: "eae3cf"},
	{position: [1,-2,0], color: "eae3cf"},
	{position: [2,-2,0], color: "ee4444"},
	{position: [3,-2,0], color: "eae3cf"},
	{position: [4,-2,0], color: "eae3cf"},
	{position: [5,-2,0], color: "eae3cf"},
	{position: [7,-2,0], color: "eae3cf"},

	{position: [-7,-1,0], color: "eae3cf"},
	{position: [-4,-1,0], color: "eae3cf"},
	{position: [-3,-1,0], color: "eae3cf"},
	{position: [-2,-1,0], color: "eae3cf"},
	{position: [-1,-1,0], color: "eae3cf"},
	{position: [0,-1,0], color: "eae3cf"},
	{position: [1,-1,0], color: "eae3cf"},
	{position: [2,-1,0], color: "eae3cf"},
	{position: [3,-1,0], color: "eae3cf"},
	{position: [4,-1,0], color: "eae3cf"},
	{position: [7,-1,0], color: "eae3cf"},

	{position: [-7,0,0], color: "ee4444"},
	{position: [-4,0,0], color: "eae3cf"},
	{position: [-3,0,0], color: "eae3cf"},
	{position: [-2,0,0], color: "eae3cf"},
	{position: [-1,0,0], color: "eae3cf"},
	{position: [0,0,0], color: "eae3cf"},
	{position: [1,0,0], color: "eae3cf"},
	{position: [2,0,0], color: "eae3cf"},
	{position: [3,0,0], color: "eae3cf"},
	{position: [4,0,0], color: "eae3cf"},
	{position: [7,0,0], color: "ee4444"},

	{position: [-7,-1,0], color: "ee4444"},
	{position: [-4,1,0], color: "eae3cf"},
	{position: [-3,1,0], color: "eae3cf"},
	{position: [-2,1,0], color: "eae3cf"},
	{position: [-1,1,0], color: "eae3cf"},
	{position: [0,1,0], color: "eae3cf"},
	{position: [1,1,0], color: "eae3cf"},
	{position: [2,1,0], color: "eae3cf"},
	{position: [3,1,0], color: "eae3cf"},
	{position: [4,1,0], color: "eae3cf"},
	{position: [7,1,0], color: "ee4444"},

	{position: [-4,2,0], color: "eae3cf"},
	{position: [-2,2,0], color: "eae3cf"},
	{position: [-1,2,0], color: "eae3cf"},
	{position: [0,2,0], color: "eae3cf"},
	{position: [1,2,0], color: "eae3cf"},
	{position: [2,2,0], color: "eae3cf"},
	{position: [4,2,0], color: "eae3cf"},

	{position: [-4,3,0], color: "ee4444"},
	{position: [-1,3,0], color: "eae3cf"},
	{position: [0,3,0], color: "eae3cf"},
	{position: [1,3,0], color: "eae3cf"},
	{position: [4,3,0], color: "ee4444"},

	{position: [-4,4,0], color: "ee4444"},
	{position: [-1,4,0], color: "eae3cf"},
	{position: [0,4,0], color: "eae3cf"},
	{position: [1,4,0], color: "eae3cf"},
	{position: [4,4,0], color: "ee4444"},

	{position: [-1,5,0], color: "eae3cf"},
	{position: [0,5,0], color: "eae3cf"},
	{position: [1,5,0], color: "eae3cf"},

	{position: [0,6,0], color: "eae3cf"},

	{position: [0,7,0], color: "eae3cf"},
	
	//lvl2
	{position: [0,-6,1], color: "eae3cf"},

	{position: [-2,-5,1], color: "ee4444"},
	{position: [0,-5,1], color: "eae3cf"},
	{position: [2,-5,1], color: "ee4444"},

	{position: [-2,-4,1], color: "ee4444"},
	{position: [0,-4,1], color: "eae3cf"},
	{position: [2,-4,1], color: "ee4444"},

	{position: [-6,-3,1], color: "eae3cf"},
	{position: [-5,-3,1], color: "eae3cf"},
	{position: [-4,-3,1], color: "eae3cf"},
	{position: [-3,-3,1], color: "eae3cf"},
	{position: [-2,-3,1], color: "ee4444"},
	{position: [-1,-3,1], color: "eae3cf"},
	{position: [0,-3,1], color: "eae3cf"},
	{position: [1,-3,1], color: "eae3cf"},
	{position: [2,-3,1], color: "ee4444"},
	{position: [3,-3,1], color: "eae3cf"},
	{position: [4,-3,1], color: "eae3cf"},
	{position: [5,-3,1], color: "eae3cf"},
	{position: [6,-3,1], color: "eae3cf"},

	{position: [-5,-2,1], color: "eae3cf"},
	{position: [-4,-2,1], color: "eae3cf"},
	{position: [-3,-2,1], color: "eae3cf"},
	{position: [-2,-2,1], color: "eae3cf"},
	{position: [-1,-2,1], color: "eae3cf"},
	{position: [0,-2,1], color: "eae3cf"},
	{position: [1,-2,1], color: "eae3cf"},
	{position: [2,-2,1], color: "eae3cf"},
	{position: [3,-2,1], color: "eae3cf"},
	{position: [4,-2,1], color: "eae3cf"},
	{position: [5,-2,1], color: "eae3cf"},

	{position: [-4,-1,1], color: "eae3cf"},
	{position: [-3,-1,1], color: "eae3cf"},
	{position: [-2,-1,1], color: "eae3cf"},
	{position: [-1,-1,1], color: "eae3cf"},
	{position: [0,-1,1], color: "eae3cf"},
	{position: [1,-1,1], color: "eae3cf"},
	{position: [2,-1,1], color: "eae3cf"},
	{position: [3,-1,1], color: "eae3cf"},
	{position: [4,-1,1], color: "eae3cf"},

	{position: [-4,0,1], color: "4444ee"},
	{position: [-3,0,1], color: "eae3cf"},
	{position: [-2,0,1], color: "eae3cf"},
	{position: [-1,0,1], color: "eae3cf"},
	{position: [0,0,1], color: "eae3cf"},
	{position: [1,0,1], color: "eae3cf"},
	{position: [2,0,1], color: "eae3cf"},
	{position: [3,0,1], color: "eae3cf"},
	{position: [4,0,1], color: "4444ee"},

	{position: [-3,1,1], color: "4444ee"},
	{position: [-2,1,1], color: "eae3cf"},
	{position: [-1,1,1], color: "eae3cf"},
	{position: [0,1,1], color: "eae3cf"},
	{position: [1,1,1], color: "eae3cf"},
	{position: [2,1,1], color: "eae3cf"},
	{position: [3,1,1], color: "4444ee"},

	{position: [-2,2,1], color: "eae3cf"},
	{position: [-1,2,1], color: "eae3cf"},
	{position: [0,2,1], color: "eae3cf"},
	{position: [1,2,1], color: "eae3cf"},
	{position: [2,2,1], color: "eae3cf"},

	{position: [-1,3,1], color: "eae3cf"},
	{position: [0,3,1], color: "eae3cf"},
	{position: [1,3,1], color: "eae3cf"},

	{position: [0,4,1], color: "eae3cf"},

	{position: [0,5,1], color: "eae3cf"},

	{position: [0,6,1], color: "eae3cf"},

	//lvl3
	{position: [0,-5,2], color: "eae3cf"},

	{position: [0,-6,2], color: "eae3cf"},

	{position: [-1,-1,2], color: "ee4444"},
	{position: [1,-1,2], color: "ee4444"},

	{position: [-1,0,2], color: "ee4444"},
	{position: [0,0,2], color: "ee4444"},
	{position: [1,0,2], color: "ee4444"},

	{position: [0,1,2], color: "ee4444"},

	//lv4
	{position: [0,-6,3], color: "eae3cf"},

];