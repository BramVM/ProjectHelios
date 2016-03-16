var items = [
     {
        id: 0,
        label: "junk",
        type: 0
    },
    {
        id: 1,
        label: "iron",
        type: 0
    },
    {
        id: 2,
        label: "water",
        type: 0
    },
    {
        id: 3,
        label: "copper",
        type: 0
    },
    {
        id: 4,
        label: "lithium",
        type: 0
    },       
    {
        id: 5,
        label: "lava",
        type: 0
    },
    {
        id: 6,
        label: "acid",
        type: 0
    },
    {
        id: 7,
        label: "gold",
        type: 0
    },
    {
        id: 9,
        label : "miningdroid schematic",
        result : {
            id: 8,
            label: "miningdroid",
            type: 2
        },
        recipe : [[1,2],[3,1]],
        type: 1
    }
];


if (typeof(module) !== 'undefined') module.exports = items;