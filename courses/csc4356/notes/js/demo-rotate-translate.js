// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

//------------------------------------------------------------------------------

function DemoRotateTranslate() {
    DemoTransform.call(this, "DemoRotateTranslate");
}

DemoRotateTranslate.prototype = Object.create(DemoTransform.prototype);
DemoRotateTranslate.prototype.constructor = DemoRotateTranslate;

DemoRotateTranslate.prototype.update = function() {

    // Get the current slider values.

    var x = parseFloat(document.getElementById("xin").value);
    var y = parseInt  (document.getElementById("yin").value);

    // Set the current numerical display.

    document.getElementById("xout").innerHTML = x;
    document.getElementById("yout").innerHTML = y;

    // Create a transformation matrix and set its uniform.

    var M = mat4.create();

    mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
    mat4.translate(M, M, vec3.fromValues(0, 0, -5));
    mat4.rotateX(M, M, glMatrix.toRadian(30));

    mat4.rotateY(M, M, glMatrix.toRadian(y));
    mat4.translate(M, M, vec3.fromValues(x, 0, 0));

    this.gl.uniformMatrix4fv(this.ModelLocation, false, M);

    // Draw the updated frame.

    this.draw();
}

//------------------------------------------------------------------------------

function DemoTranslateRotate() {
    DemoTransform.call(this, "DemoTranslateRotate");
}

DemoTranslateRotate.prototype = Object.create(DemoTransform.prototype);
DemoTranslateRotate.prototype.constructor = DemoTranslateRotate;

DemoTranslateRotate.prototype.update = function() {

    // Get the current slider values.

    var x = parseFloat(document.getElementById("xin").value);
    var y = parseInt  (document.getElementById("yin").value);

    // Set the current numerical display.

    document.getElementById("xout").innerHTML = x;
    document.getElementById("yout").innerHTML = y;

    // Create a transformation matrix and set its uniform.

    var M = mat4.create();

    mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
    mat4.translate(M, M, vec3.fromValues(0, 0, -5));
    mat4.rotateX(M, M, glMatrix.toRadian(30));

    mat4.translate(M, M, vec3.fromValues(x, 0, 0));
    mat4.rotateY(M, M, glMatrix.toRadian(y));

    this.gl.uniformMatrix4fv(this.ModelLocation, false, M);

    // Draw the updated frame.

    this.draw();
}
