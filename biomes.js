var biomes = [
    {
        label : "defualt",
        presence : 0,
        stars : {
            densety : 2,
            maxSize : 6,
            minSize : 1, 
            color: {
                r : 205,
                g : 205,
                b : 205,
                delta: 50
            }
        },
        light :{
            color: {
                r : 255,
                g : 255,
                b : 255
            }
        },
        planets : {
            densety : 0.0003,
            maxSize : 20,
            minSize : 5, 
            color: {
                r : 71,
                g : 122,
                b : 20,
                delta: 20
            },
            items : [
                {
                    label: "iron",
                    probability : 1,
                    share : 0.05
                }
            ]
        },
    },
    {
        label : "red",
        presence : 1,
        stars : {
            densety : 7,
            maxSize : 7,
            minSize : 2.5, 
            color: {
                r : 225,
                g : 110,
                b : 110,
                delta: 25
            }
        },
        light :{
            color: {
                r : 255,
                g : 80,
                b : 80
            }
        },
        planets : {
            densety : 0.0003,
            maxSize : 20,
            minSize : 5, 
            color: {
                r : 153,
                g : 102,
                b : 51,
                delta: 20
            }

        }
    },
    {
        label : "blue",
        presence : 1,
        stars : {
            densety : 4,
            maxSize : 6,
            minSize : 1, 
            color: {
                r : 80,
                g : 80,
                b : 225,
                delta: 20
            }
        },
        light :{
            color: {
                r : 120,
                g : 120,
                b : 255
            }
        },
        planets : {
            densety : 0.0003,
            maxSize : 20,
            minSize : 5, 
            color: {
                r : 80,
                g : 80,
                b : 225,
                delta: 20
            }

        }
    },
    {
        label : "green",
        presence : 1,
        stars : {
            densety : 6,
            maxSize : 6,
            minSize : 1, 
            color: {
                r : 110,
                g : 225,
                b : 110,
                delta: 20
            }
        },
        light :{
            color: {
                r : 0,
                g : 0,
                b : 0
            }
        },
        planets : {
            densety : 0.0003,
            maxSize : 20,
            minSize : 5, 
            color: {
                r : 147,
                g : 147,
                b : 20,
                delta: 20
            }

        }
    }
];

if (typeof(module) !== 'undefined') module.exports = biomes;