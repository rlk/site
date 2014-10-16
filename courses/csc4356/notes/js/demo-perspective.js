// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

function DemoPerspective() {
    DemoTransform.call(this, "DemoPerspective");
}

DemoPerspective.prototype = Object.create(DemoTransform.prototype);
DemoPerspective.prototype.constructor = DemoPerspective;

DemoPerspective.prototype.update = function() {

    // Get the current z slider value.

    var z = parseFloat(document.getElementById("zin").value);

    // Set the current numerical display.

    document.getElementById("zout").innerHTML = z.toFixed(1);

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

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.uniformMatrix4fv(this.ModelLocation, false, A);
    this.draw();
    this.gl.uniformMatrix4fv(this.ModelLocation, false, B);
    this.draw();
}
