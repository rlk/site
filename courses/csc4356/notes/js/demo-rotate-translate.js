// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

//------------------------------------------------------------------------------

function DemoRotateTranslate() {
    DemoTransform.call(this, "demoRotateTranslateCanvas");

    var demoRotateTranslateXIn  = document.getElementById("demoRotateTranslateXIn");
    var demoRotateTranslateYIn  = document.getElementById("demoRotateTranslateYIn");
    var demoRotateTranslateXOut = document.getElementById("demoRotateTranslateXOut");
    var demoRotateTranslateYOut = document.getElementById("demoRotateTranslateYOut");

    var that = this;

    this.update = function() {

        // Get the current slider values.

        var x = parseFloat(demoRotateTranslateXIn.value);
        var y = parseInt  (demoRotateTranslateYIn.value);

        // Set the current numerical display.

        demoRotateTranslateXOut.innerHTML = x;
        demoRotateTranslateYOut.innerHTML = y + '&deg;';

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(M, M, vec3.fromValues(0, 0, -5));
        mat4.rotateX(M, M, glMatrix.toRadian(30));

        mat4.rotateY(M, M, glMatrix.toRadian(y));
        mat4.translate(M, M, vec3.fromValues(x, 0, 0));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    this.update();
}

DemoRotateTranslate.prototype = Object.create(DemoTransform.prototype);
DemoRotateTranslate.prototype.constructor = DemoRotateTranslate;

//------------------------------------------------------------------------------

function DemoTranslateRotate() {
    DemoTransform.call(this, "demoTranslateRotateCanvas");

    var demoTranslateRotateXIn  = document.getElementById("demoRotateTranslateXIn");
    var demoTranslateRotateYIn  = document.getElementById("demoRotateTranslateYIn");
    var demoTranslateRotateXOut = document.getElementById("demoRotateTranslateXOut");
    var demoTranslateRotateYOut = document.getElementById("demoRotateTranslateYOut");

    var that = this;

    this.update = function() {

        // Get the current slider values.

        var x = parseFloat(demoTranslateRotateXIn.value);
        var y = parseInt  (demoTranslateRotateYIn.value);

        // Set the current numerical display.

        demoTranslateRotateXOut.innerHTML = x.toFixed(1);
        demoTranslateRotateYOut.innerHTML = y + '&deg;';

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(M, M, vec3.fromValues(0, 0, -5));
        mat4.rotateX(M, M, glMatrix.toRadian(30));

        mat4.translate(M, M, vec3.fromValues(x, 0, 0));
        mat4.rotateY(M, M, glMatrix.toRadian(y));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    this.update();
}

DemoTranslateRotate.prototype = Object.create(DemoTransform.prototype);
DemoTranslateRotate.prototype.constructor = DemoTranslateRotate;
