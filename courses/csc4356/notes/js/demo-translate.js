// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function DemoTranslate() {
    DemoTransform.call(this, "demoTranslateCanvas");

    var demoTranslateXIn  = document.getElementById("demoTranslateXIn");
    var demoTranslateYIn  = document.getElementById("demoTranslateYIn");
    var demoTranslateZIn  = document.getElementById("demoTranslateZIn");

    var demoTranslateXOut = document.getElementById("demoTranslateXOut");
    var demoTranslateYOut = document.getElementById("demoTranslateYOut");
    var demoTranslateZOut = document.getElementById("demoTranslateZOut");

    var that = this;

    function update() {

        // Get the current (x, y, z) slider values.

        var x = parseFloat(demoTranslateXIn.value);
        var y = parseFloat(demoTranslateYIn.value);
        var z = parseFloat(demoTranslateZIn.value);

        // Set the current numerical display.

        demoTranslateXOut.innerHTML = x.toFixed(1);
        demoTranslateYOut.innerHTML = y.toFixed(1);
        demoTranslateZOut.innerHTML = z.toFixed(1);

        // Create a transformation matrix and set its uniform.

        var M = mat4.create();

        mat4.ortho(M, -1, +1, -1, +1, -1, +1);
        mat4.translate(M, M, vec3.fromValues(x, y, z));

        that.gl.uniformMatrix4fv(that.ModelLocation, false, M);

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.draw();
    }

    demoTranslateXIn.oninput = update;
    demoTranslateYIn.oninput = update;
    demoTranslateZIn.oninput = update;

    update();
}

DemoTranslate.prototype = Object.create(DemoTransform.prototype);
DemoTranslate.prototype.constructor = DemoTranslate;
