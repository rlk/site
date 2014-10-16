// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

//------------------------------------------------------------------------------

function DemoScaleTranslate() {
    DemoTransform.call(this, "DemoScaleTranslate");
}

DemoScaleTranslate.prototype = Object.create(DemoTransform.prototype);
DemoScaleTranslate.prototype.constructor = DemoScaleTranslate;

DemoScaleTranslate.prototype.update = function() {

    // Get the current slider values.

    var x = parseFloat(document.getElementById("xin").value);
    var y = parseFloat(document.getElementById("yin").value);

    // Set the current numerical display.

    document.getElementById("xout").innerHTML = x.toFixed(1);
    document.getElementById("yout").innerHTML = y.toFixed(1);

    // Create a transformation matrix and set its uniform.

    var M = mat4.create();

    mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
    mat4.translate(M, M, vec3.fromValues(0, 0, -5));
    mat4.rotateX(M, M, glMatrix.toRadian(30));

    mat4.scale(M, M, vec3.fromValues(y, y, y));
    mat4.translate(M, M, vec3.fromValues(x, 0, 0));

    this.gl.uniformMatrix4fv(this.ModelLocation, false, M);

    // Draw the updated frame.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.draw();
}

//------------------------------------------------------------------------------

function DemoTranslateScale() {
    DemoTransform.call(this, "DemoTranslateScale");
}

DemoTranslateScale.prototype = Object.create(DemoTransform.prototype);
DemoTranslateScale.prototype.constructor = DemoTranslateScale;

DemoTranslateScale.prototype.update = function() {

    // Get the current slider values.

    var x = parseFloat(document.getElementById("xin").value);
    var y = parseFloat(document.getElementById("yin").value);

    // Set the current numerical display.

    document.getElementById("xout").innerHTML = x;
    document.getElementById("yout").innerHTML = y;

    // Create a transformation matrix and set its uniform.

    var M = mat4.create();

    mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
    mat4.translate(M, M, vec3.fromValues(0, 0, -5));
    mat4.rotateX(M, M, glMatrix.toRadian(30));

    mat4.translate(M, M, vec3.fromValues(x, 0, 0));
    mat4.scale(M, M, vec3.fromValues(y, y, y));

    this.gl.uniformMatrix4fv(this.ModelLocation, false, M);

    // Draw the updated frame.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.draw();
}
