// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

//------------------------------------------------------------------------------

function DemoScaleTranslate() {
    DemoTransform.call(this, "demoScaleTranslateCanvas");

    var demoScaleTranslateXIn  = document.getElementById("demoScaleTranslateXIn");
    var demoScaleTranslateSIn  = document.getElementById("demoScaleTranslateSIn");
    var demoScaleTranslateXOut = document.getElementById("demoScaleTranslateXOut");
    var demoScaleTranslateSOut = document.getElementById("demoScaleTranslateSOut");

    var that = this;

    this.update = function() {

        // Get the current slider values.

        var x = parseFloat(demoScaleTranslateXIn.value);
        var y = parseFloat(demoScaleTranslateSIn.value);

        // Set the current numerical display.

        demoScaleTranslateXOut.innerHTML = x.toFixed(1);
        demoScaleTranslateSOut.innerHTML = y.toFixed(1);

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(M, M, vec3.fromValues(0, 0, -5));
        mat4.rotateX(M, M, glMatrix.toRadian(30));

        mat4.scale(M, M, vec3.fromValues(y, y, y));
        mat4.translate(M, M, vec3.fromValues(x, 0, 0));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    this.update();
}

DemoScaleTranslate.prototype = Object.create(DemoTransform.prototype);
DemoScaleTranslate.prototype.constructor = DemoScaleTranslate;

//------------------------------------------------------------------------------

function DemoTranslateScale() {
    DemoTransform.call(this, "demoTranslateScaleCanvas");

    var demoTranslateScaleXIn  = document.getElementById("demoScaleTranslateXIn");
    var demoTranslateScaleSIn  = document.getElementById("demoScaleTranslateSIn");
    var demoTranslateScaleXOut = document.getElementById("demoScaleTranslateXOut");
    var demoTranslateScaleSOut = document.getElementById("demoScaleTranslateSOut");

    var that = this;

    this.update = function() {

        // Get the current slider values.

        var x = parseFloat(demoTranslateScaleXIn.value);
        var y = parseFloat(demoTranslateScaleSIn.value);

        // Set the current numerical display.

        demoTranslateScaleXOut.innerHTML = x;
        demoTranslateScaleSOut.innerHTML = y;

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.perspective(M, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(M, M, vec3.fromValues(0, 0, -5));
        mat4.rotateX(M, M, glMatrix.toRadian(30));

        mat4.translate(M, M, vec3.fromValues(x, 0, 0));
        mat4.scale(M, M, vec3.fromValues(y, y, y));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    this.update();
}

DemoTranslateScale.prototype = Object.create(DemoTransform.prototype);
DemoTranslateScale.prototype.constructor = DemoTranslateScale;
