// Copyright (c) 2014 Robert Kooima

// Requires gl-shader.js
// Requires gl-matrix.js

var gl;

//------------------------------------------------------------------------------

var vertices = new Float32Array([
     0.0, 1.0,  0.5, 1.0, 1.0, 0.9,
    -0.5, 0.5,  0.5, 1.0, 1.0, 0.9,
    -0.5, 0.0,  0.5, 1.0, 1.0, 0.9,
     0.5, 0.0,  0.5, 1.0, 1.0, 0.9,
     0.5, 0.5,  0.5, 1.0, 1.0, 0.9,
     0.0, 1.0, -0.5, 1.0, 1.0, 0.9,
    -0.5, 0.5, -0.5, 1.0, 1.0, 0.9,
    -0.5, 0.0, -0.5, 1.0, 1.0, 0.9,
     0.5, 0.0, -0.5, 1.0, 1.0, 0.9,
     0.5, 0.5, -0.5, 1.0, 1.0, 0.9,
     0.0, 1.0,  0.5, 0.8, 0.0, 0.0,
    -0.5, 0.5,  0.5, 0.8, 0.0, 0.0,
     0.5, 0.5,  0.5, 0.8, 0.0, 0.0,
     0.0, 1.0, -0.5, 0.8, 0.0, 0.0,
    -0.5, 0.5, -0.5, 0.8, 0.0, 0.0,
     0.5, 0.5, -0.5, 0.8, 0.0, 0.0,
]);

var triangles = new Uint16Array([
     0,  1,  4,
     4,  1,  3,
     3,  1,  2,
    10, 13, 11,
    13, 11, 14,
     1,  6,  2,
     2,  6,  7,
     2,  7,  3,
     3,  7,  8,
     3,  8,  4,
     4,  8,  9,
    12, 15, 10,
    10, 15, 13,
     5,  9,  6,
     6,  9,  7,
     7,  9,  8,
]);

var points = new Uint16Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]);

var lines = new Uint16Array([
    0, 1,
    1, 2,
    2, 3,
    3, 4,
    4, 0,
    5, 6,
    6, 7,
    7, 8,
    8, 9,
    9, 5,
    0, 5,
    1, 6,
    2, 7,
    3, 8,
    4, 9,
]);

//------------------------------------------------------------------------------

var vertex_shader_source =
    'uniform   mat4 Model;\n' +
    'attribute vec4 vPosition;\n' +
    'attribute vec3 vColor;\n' +
    'varying mediump vec3 fColor;\n' +
    'void main() {\n' +
    '    fColor = vColor;\n' +
    '    gl_Position = Model * vPosition;\n' +
    '    gl_PointSize = 8.0;\n' +
    '}\n';

var fragment_shader_source =
    'uniform mediump vec3 Light;\n' +
    'varying mediump vec3 fColor;\n' +
    'void main() {\n' +
    '    gl_FragColor = vec4(Light * fColor, 1.0);\n' +
    '}\n';

//------------------------------------------------------------------------------

function DemoTransform() {
    try {
        // Initialize the WebGL context.

        gl = document.getElementById('webgl').getContext('webgl');

        // Initialize the program object and its uniforms.

	    this.program = newProgram(gl, vertex_shader_source, fragment_shader_source);

        gl.useProgram(this.program);

        this.ModelLocation = gl.getUniformLocation(this.program, 'Model');
        this.LightLocation = gl.getUniformLocation(this.program, 'Light');

        // Initialize vertex and index buffer objects.

        this.vertexBuffer   = gl.createBuffer();
        this.triangleBuffer = gl.createBuffer();
        this.pointBuffer    = gl.createBuffer();
        this.lineBuffer     = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, lines, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.pointBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, points, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangles, gl.STATIC_DRAW);

        // Link the shader attributes to the vertex buffer object.

        var vPositionLocation = gl.getAttribLocation(this.program, 'vPosition');
        var vColorLocation    = gl.getAttribLocation(this.program, 'vColor');

        gl.vertexAttribPointer(vPositionLocation, 3, gl.FLOAT, false, 24,  0);
        gl.vertexAttribPointer(vColorLocation,    3, gl.FLOAT, false, 24, 12);

        gl.enableVertexAttribArray(vPositionLocation);
        gl.enableVertexAttribArray(vColorLocation);

        // Set up to render.

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.enable(gl.DEPTH_TEST);

        gl.uniformMatrix4fv(this.ModelLocation, false, mat4.create());

        // Render a first frame.

        this.draw();

	} catch (e) {
		console.log(e.message);
	}
}

DemoTransform.prototype.draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangles in color.

    gl.uniform3f(this.LightLocation, 1, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    gl.drawElements(gl.TRIANGLES, triangles.length, gl.UNSIGNED_SHORT, 0);

    // Draw the points in black.

    gl.uniform3f(this.LightLocation, 0, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.pointBuffer);
    gl.drawElements(gl.POINTS, points.length, gl.UNSIGNED_SHORT, 0);

    // Draw the lines in black.

    gl.uniform3f(this.LightLocation, 0, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
    gl.drawElements(gl.LINES, lines.length, gl.UNSIGNED_SHORT, 0);
}


//------------------------------------------------------------------------------


