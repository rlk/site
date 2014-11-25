// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function DemoRotate() {
    DemoTransform.call(this, "demoRotateCanvas");

    var demoRotateXIn  = document.getElementById("demoRotateXIn");
    var demoRotateYIn  = document.getElementById("demoRotateYIn");
    var demoRotateZIn  = document.getElementById("demoRotateZIn");

    var demoRotateXOut = document.getElementById("demoRotateXOut");
    var demoRotateYOut = document.getElementById("demoRotateYOut");
    var demoRotateZOut = document.getElementById("demoRotateZOut");

    var that = this;

    function update() {

        // Get the current (x, y, z) slider values.

        var x = parseInt(demoRotateXIn.value);
        var y = parseInt(demoRotateYIn.value);
        var z = parseInt(demoRotateZIn.value);

        // Set the current numerical display.

        demoRotateXOut.innerHTML = x + '&deg;';
        demoRotateYOut.innerHTML = y + '&deg;';
        demoRotateZOut.innerHTML = z + '&deg;';

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.ortho(M, -1, +1, -1, +1, -1, +1);
        mat4.rotateX(M, M, glMatrix.toRadian(x));
        mat4.rotateY(M, M, glMatrix.toRadian(y));
        mat4.rotateZ(M, M, glMatrix.toRadian(z));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    demoRotateXIn.oninput = update;
    demoRotateYIn.oninput = update;
    demoRotateZIn.oninput = update;

    update();
}

DemoRotate.prototype = Object.create(DemoTransform.prototype);
DemoRotate.prototype.constructor = DemoRotate;
