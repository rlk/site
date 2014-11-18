// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function DemoScale() {
    DemoTransform.call(this, "demoScaleCanvas");

    var demoScaleXIn  = document.getElementById("demoScaleXIn");
    var demoScaleYIn  = document.getElementById("demoScaleYIn");
    var demoScaleZIn  = document.getElementById("demoScaleZIn");

    var demoScaleXOut = document.getElementById("demoScaleXOut");
    var demoScaleYOut = document.getElementById("demoScaleYOut");
    var demoScaleZOut = document.getElementById("demoScaleZOut");

    var that = this;

    function update() {

        // Get the current (x, y, z) slider values.

        var x = parseFloat(demoScaleXIn.value);
        var y = parseFloat(demoScaleYIn.value);
        var z = parseFloat(demoScaleZIn.value);

        // Set the current numerical display.

        demoScaleXOut.innerHTML = x.toFixed(1);
        demoScaleYOut.innerHTML = y.toFixed(1);
        demoScaleZOut.innerHTML = z.toFixed(1);

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.ortho(M, -1, +1, -1, +1, -1, +1);
        mat4.scale(M, M, vec3.fromValues(x, y, z));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    document.getElementById("demoScaleXIn").oninput = update;
    document.getElementById("demoScaleYIn").oninput = update;
    document.getElementById("demoScaleZIn").oninput = update;

    update();
}

DemoScale.prototype = Object.create(DemoTransform.prototype);
DemoScale.prototype.constructor = DemoScale;

