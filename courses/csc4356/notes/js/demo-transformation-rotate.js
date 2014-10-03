// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function update() {

    // Get the current (x, y, z) slider values.

    var x = parseInt(document.getElementById("xin").value);
    var y = parseInt(document.getElementById("yin").value);
    var z = parseInt(document.getElementById("zin").value);

    // Set the current numerical display.

    document.getElementById("xout").innerHTML = x;
    document.getElementById("yout").innerHTML = y;
    document.getElementById("zout").innerHTML = z;

    // Create a transformation matrix and set its uniform.

    var M = mat4.create();
    mat4.ortho(M, -1, +1, -1, +1, -1, +1);
    mat4.rotateX(M, M, glMatrix.toRadian(x));
    mat4.rotateY(M, M, glMatrix.toRadian(y));
    mat4.rotateZ(M, M, glMatrix.toRadian(z));

    gl.uniformMatrix4fv(ModelLocation, false, M);

    // Draw the updated frame.

    draw();
}
