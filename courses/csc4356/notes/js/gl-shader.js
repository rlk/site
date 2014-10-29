
// Compile the shader source. Throw if compilation fails.

function makeShader(gl, shader, source) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
    }
}

// Create and initialize a new shader object using the given type and source.
// Delete the shader object and rethrow on failure.

function newShader(gl, type, source) {
    var shader = gl.createShader(type);
    try {
        makeShader(gl, shader, source);
    } catch (e) {
        gl.deleteShader(shader);
        throw e;
    }
    return shader;
}

// Link the program with the given source strings. Throw if linking fails.

function makeProgram(gl, program, vertSource, fragSource) {
    gl.attachShader(program, newShader(gl, gl.VERTEX_SHADER,   vertSource));
    gl.attachShader(program, newShader(gl, gl.FRAGMENT_SHADER, fragSource));

    gl.bindAttribLocation(program, 0, "vPosition");
    gl.bindAttribLocation(program, 1, "vOffset");
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
    }
}

// Create and makeialize a new program object using the given shader source
// strings. Delete the program and rethrow on failure.

function newProgram(gl, vertSource, fragSource) {
    var program = gl.createProgram();
    try {
        makeProgram(gl, program, vertSource, fragSource);
    } catch (e) {
        deleteProgram(gl, program);
        throw e;
    }
    return program
}

// Delete a program object and any shader objects attached to it.

function deleteProgram(gl, program) {
    gl.getAttachedShaders(program).map(gl.deleteShader);
    gl.deleteProgram(program);
}

