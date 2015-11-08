enemies = [
    {
        id : 0,
        label : "test1",
        attackSpeed : 20,
        bulletRange : 2500,
        bulletDamage : 4,
        health : 100,
        engine : {
          label: "bad engine",
          acceleration : 0.05,
          topspeed :6
        },
        sideEngine : {
          label: "bad side engine",
          acceleration : 0.05,
          topspeed :3
        },
        model : require('./models/mainShip1.js'),
        detectionRange : 1000,
        approachRange : 500,
        backOffRange : 300,
        shootingRange : 750
    },
    {
        id : 1,
        label : "test2",
        attackSpeed : 20,
        bulletRange : 2500,
        bulletDamage : 1,
        health : 100,
        engine : {
          label: "bad engine",
          acceleration : 0.05,
          topspeed :6
        },
        sideEngine : {
          label: "bad side engine",
          acceleration : 0.05,
          topspeed :3
        },
        model : require('./models/mainShip.js'),
        detectionRange : 1000,
        approachRange : 500,
        backOffRange : 300,
        shootingRange : 750
    },
];

if (typeof(module) !== 'undefined') module.exports = enemies;