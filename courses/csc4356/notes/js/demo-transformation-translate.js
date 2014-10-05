// Copyright (c) 2014 Robert Kooima

// Requires demo-transformation.js

DemoTransformation.prototype.update = function() {

	// Get the current (x, y, z) slider values.

	var x = parseFloat(document.getElementById("xin").value);
	var y = parseFloat(document.getElementById("yin").value);
	var z = parseFloat(document.getElementById("zin").value);

	// Set the current numerical display.

	document.getElementById("xout").innerHTML = x.toFixed(1);
	document.getElementById("yout").innerHTML = y.toFixed(1);
	document.getElementById("zout").innerHTML = z.toFixed(1);

	// Create a transformation matrix and set its uniform.

    var M = mat4.create();

    mat4.ortho(M, -1, +1, -1, +1, -1, +1);
	mat4.translate(M, M, vec3.fromValues(x, y, z));

    gl.uniformMatrix4fv(this.ModelLocation, false, M);

    // Draw the updated frame.

    this.draw();
}
