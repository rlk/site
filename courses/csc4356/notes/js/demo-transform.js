// Copyright (c) 2014 Robert Kooima

// Requires gl-shader.js
// Requires gl-matrix.js

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

function DemoTransform(id) {
    try {
        // Initialize the WebGL context.

        this.gl = document.getElementById(id).getContext('webgl');

        // Initialize the program object and its uniforms.

	    this.program = newProgram(this.gl, vertex_shader_source, fragment_shader_source);

        this.gl.useProgram(this.program);

        this.ModelLocation = this.gl.getUniformLocation(this.program, 'Model');
        this.LightLocation = this.gl.getUniformLocation(this.program, 'Light');

        // Initialize vertex and index buffer objects.

        this.vertexBuffer   = this.gl.createBuffer();
        this.triangleBuffer = this.gl.createBuffer();
        this.pointBuffer    = this.gl.createBuffer();
        this.lineBuffer     = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, lines, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.pointBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, points, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, triangles, this.gl.STATIC_DRAW);

        // Link the shader attributes to the vertex buffer object.

        var vPositionLocation = this.gl.getAttribLocation(this.program, 'vPosition');
        var vColorLocation    = this.gl.getAttribLocation(this.program, 'vColor');

        this.gl.vertexAttribPointer(vPositionLocation, 3, this.gl.FLOAT, false, 24,  0);
        this.gl.vertexAttribPointer(vColorLocation,    3, this.gl.FLOAT, false, 24, 12);

        this.gl.enableVertexAttribArray(vPositionLocation);
        this.gl.enableVertexAttribArray(vColorLocation);

        // Set up to render.

        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.enable(this.gl.DEPTH_TEST);

	} catch (e) {
		console.log(e.message);
	}
}

DemoTransform.prototype.draw = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Draw the triangles in color.

    this.gl.uniform3f(this.LightLocation, 1, 1, 1);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    this.gl.drawElements(this.gl.TRIANGLES, triangles.length, this.gl.UNSIGNED_SHORT, 0);

    // Draw the points in black.

    this.gl.uniform3f(this.LightLocation, 0, 0, 0);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.pointBuffer);
    this.gl.drawElements(this.gl.POINTS, points.length, this.gl.UNSIGNED_SHORT, 0);

    // Draw the lines in black.

    this.gl.uniform3f(this.LightLocation, 0, 0, 0);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.lineBuffer);
    this.gl.drawElements(this.gl.LINES, lines.length, this.gl.UNSIGNED_SHORT, 0);
}


//------------------------------------------------------------------------------


