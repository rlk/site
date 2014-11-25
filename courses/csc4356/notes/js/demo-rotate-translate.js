// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

//------------------------------------------------------------------------------

function DemoRotateTranslate() {
    DemoTransform.call(this, "demoRotateTranslateCanvas");

    function update() {

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

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.draw();
    }
}

DemoRotateTranslate.prototype = Object.create(DemoTransform.prototype);
DemoRotateTranslate.prototype.constructor = DemoRotateTranslate;

//------------------------------------------------------------------------------

function DemoTranslateRotate() {
    DemoTransform.call(this, "DemoTranslateRotate");

    function update() {

        // Get the current slider values.

        var x = parseFloat(document.getElementById("xin").value);
        var y = parseInt  (document.getElementById("yin").value);

        // Set the current numerical display.

        document.getElementById("xout").innerHTML = x.toFixed(1);
        document.getElementById("yout").innerHTML = y + '&deg;';

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(M, M, vec3.fromValues(0, 0, -5));
        mat4.rotateX(M, M, glMatrix.toRadian(30));

        mat4.translate(M, M, vec3.fromValues(x, 0, 0));
        mat4.rotateY(M, M, glMatrix.toRadian(y));

        this.gl.uniformMatrix4fv(this.ModelLocation, false, M);

        // Draw the updated frame.

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.draw();
    }
}

DemoTranslateRotate.prototype = Object.create(DemoTransform.prototype);
DemoTranslateRotate.prototype.constructor = DemoTranslateRotate;
