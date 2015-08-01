var compileMesher = require("greedy-mesher")

        var mesher = compileMesher({
          extraArgs: 1,
          order: [1, 0],
          append: function(lo_x, lo_y, hi_x, hi_y, val, result) {
            result.push([[lo_x, lo_y], [hi_x, hi_y]])
          }
        })

        var test_array = require("ndarray-pack")(
        [[0, 2, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0]])

        var result = []
        mesher(test_array, result)
        console.log(result); 
// outputs: [ [ [ 1, 0 ], [ 2, 1 ] ], [ [ 1, 1 ], [ 3, 3 ] ] ]