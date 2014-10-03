
var vertices = new Float32Array([
     0.0, 1.0,  0.5, 1.0, 1.0, 0.9,
    -0.5, 0.5,  0.5, 1.0, 1.0, 0.9,
    -0.5, 0.0,  0.5, 1.0, 1.0, 0.9,
     0.5, 0.0,  0.5, 1.0, 1.0, 0.9,
     0.5, 0.5,  0.5, 1.0, 1.0, 0.9,
     0.0, 1.0, -0.5, 1.0, 1.0, 0.9,
    -0.5, 0.5, -0.5, 1.0, 1.0, 0.9,
    -0.5, 0.0, -0.5, 1.0, 1.0, 0.9,
     0.5, 0.0, -0.5, 1.0, 1.0, 0.9,
     0.5, 0.5, -0.5, 1.0, 1.0, 0.9,
     0.0, 1.0,  0.5, 0.8, 0.0, 0.0,
    -0.5, 0.5,  0.5, 0.8, 0.0, 0.0,
     0.5, 0.5,  0.5, 0.8, 0.0, 0.0,
     0.0, 1.0, -0.5, 0.8, 0.0, 0.0,
    -0.5, 0.5, -0.5, 0.8, 0.0, 0.0,
     0.5, 0.5, -0.5, 0.8, 0.0, 0.0,
]);

var triangles = new Uint16Array([
     0,  1,  4,
     4,  1,  3,
     3,  1,  2,
    10, 13, 11,
    13, 11, 14,
     1,  6,  2,
     2,  6,  7,
     2,  7,  3,
     3,  7,  8,
     3,  8,  4,
     4,  8,  9,
    12, 15, 10,
    10, 15, 13,
     5,  9,  6,
     6,  9,  7,
     7,  9,  8,
]);

var points = new Uint16Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]);

var lines = new Uint16Array([
    0, 1,
    1, 2,
    2, 3,
    3, 4,
    4, 0,
    5, 6,
    6, 7,
    7, 8,
    8, 9,
    9, 5,
    0, 5,
    1, 6,
    2, 7,
    3, 8,
    4, 9,
]);