var biomes = [
    {
        label : "Save haven",
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
            min : 0.4,
            max : 0.5,
            flux : 0.01,
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
                    share : 5
                }
            ]
        },
        enemies : [
            {   
                label : "test1",
                presence : 1
            },
            {   
                label : "test2",
                presence : 1
            }
        ]
    },
    {
        label : "Chaotic red",
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
            min : 0.3,
            max : 0.5,
            flux : 0.05,
            color: {
                r : 165,
                g : 90,
                b : 90
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

        },
        enemies : [
            {   
                label : "test1",
                presence : 1
            },
            {   
                label : "test2",
                presence : 1
            }
        ]
    },
    {
        label : "Still Blue",
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
            min : 0.4,
            max : 0.5,
            flux : 0.01,
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

        },
        enemies : [
            {   
                label : "test1",
                presence : 1
            },
            {   
                label : "test2",
                presence : 1
            }
        ]
    },
    {
        label : "Dark Green",
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
            min : 0,
            max : 0,
            flux : 0.1,
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
        },
        enemies : [
            {   
                label : "test1",
                presence : 1
            },
            {   
                label : "test2",
                presence : 1
            }
        ]
    }
];

if (typeof(module) !== 'undefined') module.exports = biomes;