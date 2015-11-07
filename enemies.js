enemies = [
    id : 0,
    label : "test",
    attackSpeed : 20,
    bulletRange : 2500,
    bulletDamage : 1,
    health : 100,
    destination : location,
    trajectory:0,
    attackDelay : attackSpeed,
    speed : 0,
    sideSpeed : 0
];

if (typeof(module) !== 'undefined') module.exports = enemies;