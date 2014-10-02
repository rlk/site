
var gl;
var demo;

var ModelLocation;

function draw() {
	var x = parseFloat(document.getElementById("xin").value);
	var y = parseFloat(document.getElementById("yin").value);
	var z = parseFloat(document.getElementById("zin").value);

	document.getElementById("xout").innerHTML = x.toFixed(1);
	document.getElementById("yout").innerHTML = y.toFixed(1);
	document.getElementById("zout").innerHTML = z.toFixed(1);

	var M = mat4.scale(mat4.create(), mat4.create(), vec3.fromValues(x, y, z));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix4fv(ModelLocation, false, M);
    gl.drawElements(gl.TRIANGLES, triangles.length, gl.UNSIGNED_SHORT, 0);
}

function main() {
    gl   = document.getElementById("webgl").getContext("webgl");
    program = newProgram(gl, vertex_shader_source, fragment_shader_source);

    gl.useProgram(program);

    ModelLocation = gl.getUniformLocation(program, "Model");

    var vbo = gl.createBuffer();
    var ebo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');

    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangles), gl.STATIC_DRAW);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    draw();
}
