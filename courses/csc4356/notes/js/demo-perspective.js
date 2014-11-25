// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function DemoPerspective() {
    DemoTransform.call(this, "demoPerspectiveCanvas");

    var demoPerspectiveZIn  = document.getElementById("demoPerspectiveZIn")
    var demoPerspectiveZOut = document.getElementById("demoPerspectiveZOut")

    var that = this;

    function update() {

        // Get the current z slider value.

        var z = parseFloat(demoPerspectiveZIn.value);

        // Set the current numerical display.

        demoPerspectiveZOut.innerHTML = z.toFixed(1);

        // Create transformation matrices.

        var A = mat4.create();
        var B = mat4.create();

        mat4.perspective(A, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(A, A, vec3.fromValues(0, 0, -5));
        mat4.rotateX(A, A, glMatrix.toRadian(30));
        mat4.translate(A, A, vec3.fromValues(-0.75, 0, 0));

        mat4.perspective(B, glMatrix.toRadian(45), 1, 1, 10);
        mat4.translate(B, B, vec3.fromValues(0, 0, -5));
        mat4.rotateX(B, B, glMatrix.toRadian(30));
        mat4.translate(B, B, vec3.fromValues(+0.75, 0, z));

        // Draw the updated frame.

        that.gl.clear(that.gl.COLOR_BUFFER_BIT);
        that.gl.uniformMatrix4fv(that.ModelLocation, false, A);
        that.draw();
        that.gl.uniformMatrix4fv(that.ModelLocation, false, B);
        that.draw();
    }

    demoPerspectiveZIn.oninput = update;

    update();
}

DemoPerspective.prototype = Object.create(DemoTransform.prototype);
DemoPerspective.prototype.constructor = DemoPerspective;
