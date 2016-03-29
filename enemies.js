enemies = [
    {
        label : "test1",
        gun : {
          accuracy : 100,
          attackSpeed : 20,
          bulletRange : 2500,
          bulletDamage : 4,
          bulletModelData : require('./models/bullet.js')
        },
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
        label : "blueBaron",
        gun : {
          accuracy : 100,
          attackSpeed : 20,
          bulletRange : 2500,
          bulletDamage : 1,
          bulletModelData : require('./models/bullet.js')
        },
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
        model : require('./models/blueBaron.js'),
        detectionRange : 1000,
        approachRange : 500,
        backOffRange : 300,
        shootingRange : 750
    },
    {
        label : "redBaron",
        gun : {
          accuracy : 100,
          attackSpeed : 60,
          bulletRange : 2500,
          recoil : 7,
          bulletDamage : 20,
          bulletModelData : require('./models/cannon_bullet.js')
        },
        health : 200,
        engine : {
          label: "bad engine",
          acceleration : 0.02,
          topspeed :5
        },
        sideEngine : {
          label: "bad side engine",
          acceleration : 0.02,
          topspeed :3
        },
        model : require('./models/redBaron.js'),
        detectionRange : 1000,
        approachRange : 500,
        backOffRange : 300,
        shootingRange : 600
    },
    {
        label : "greenBaron",
        gun : {
          accuracy : 100,
          attackSpeed : 20,
          bulletRange : 2500,
          bulletDamage : 1,
          bulletModelData : require('./models/bullet.js')
        },
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
        model : require('./models/greenBaron.js'),
        detectionRange : 1000,
        approachRange : 500,
        backOffRange : 300,
        shootingRange : 750
    }
];

if (typeof(module) !== 'undefined') module.exports = enemies;