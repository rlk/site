
var gl;
var program;

var ModelLocation;
var LightLocation;

var   vertexBuffer;
var triangleBuffer;
var    pointBuffer;
var     lineBuffer;

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangles in color.

    gl.uniform3f(LightLocation, 1, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
    gl.drawElements(gl.TRIANGLES, triangles.length, gl.UNSIGNED_SHORT, 0);

    // Draw the points in black.

    gl.uniform3f(LightLocation, 0, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pointBuffer);
    gl.drawElements(gl.POINTS, points.length, gl.UNSIGNED_SHORT, 0);

    // Draw the lines in black.

    gl.uniform3f(LightLocation, 0, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
    gl.drawElements(gl.LINES, lines.length, gl.UNSIGNED_SHORT, 0);
}

function init() {
    try {
        // Initialize the WebGL context.

        gl = document.getElementById('webgl').getContext('webgl');

        // Initialize the program object and its uniforms.

	    program = newProgram(gl, vertex_shader_source, fragment_shader_source);

        gl.useProgram(program);

        ModelLocation = gl.getUniformLocation(program, 'Model');
        LightLocation = gl.getUniformLocation(program, 'Light');

        // Initialize vertex and index buffer objects.

        vertexBuffer   = gl.createBuffer();
        triangleBuffer = gl.createBuffer();
        pointBuffer    = gl.createBuffer();
        lineBuffer     = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, lines, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pointBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, points, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangles, gl.STATIC_DRAW);

        // Link the shader attributes to the vertex buffer object.

        var vPositionLocation = gl.getAttribLocation(program, 'vPosition');
        var vColorLocation    = gl.getAttribLocation(program, 'vColor');

        gl.vertexAttribPointer(vPositionLocation, 3, gl.FLOAT, false, 24,  0);
        gl.vertexAttribPointer(vColorLocation,    3, gl.FLOAT, false, 24, 12);

        gl.enableVertexAttribArray(vPositionLocation);
        gl.enableVertexAttribArray(vColorLocation);

        // Set up to render.

        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        gl.uniformMatrix4fv(ModelLocation, false, mat4.create());

        // Render a first frame.

        draw();

	} catch (e) {
		console.log(e.message);
	}
}
