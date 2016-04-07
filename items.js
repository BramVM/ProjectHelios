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
        id: 7,
        label: "gold",
        type: 0
    },
    {
        id: 8,
        label: "basic engine",
        acceleration : 0.07,
        topspeed :7,
        type: 1
    },
    {
        id: 9,
        label: "basic side engine",
        acceleration : 0.05,
        topspeed :3,
        type: 2
    },
    {
        id: 10,
        label: "basic droid",
        capacity : 1,
        searchTime : 1,
        type: 3
    },
    {
      id: 11,
      label: "basic gun",
      accuracy: 98.5,
      attackSpeed : 10,
      bulletRange : 2500,
      bulletDamage : 20,
      bulletModelData : require('./models/bullet.js')
    }
];


if (typeof(module) !== 'undefined') module.exports = items;