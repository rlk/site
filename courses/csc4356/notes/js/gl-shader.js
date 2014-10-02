
// Return the text of src. It may be a string or an element. Throw if not found.

function getSource(src) {
    if (typeof src == "string") {
        return src
    } else {
        var element = document.getElementById(src);
        if (element) {
            return element.text;
        } else {
            throw new Error("Failed to get shader element " + src);
        }
    }
}

// Compile the shader source. Throw if compilation fails.

function makeShader(gl, shader, src) {
    gl.shaderSource(shader, getSource(src));
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
    }
}

// Create and initialize a new shader object using the given type and source.
// Delete the shader object and rethrow on failure.

function newShader(gl, type, src) {
    var shader = gl.createShader(type);
    try {
        makeShader(gl, shader, src);
    } catch (e) {
        gl.deleteShader(shader);
        throw e;
    }
    return shader;
}

// Link the program with the given source elements. Throw if linking fails.

function makeProgram(gl, program, vertId, fragId) {
    gl.attachShader(program, newShader(gl, gl.VERTEX_SHADER,   vertId));
    gl.attachShader(program, newShader(gl, gl.FRAGMENT_SHADER, fragId));

    gl.bindAttribLocation(program, 0, "vPosition");
    gl.bindAttribLocation(program, 1, "vOffset");
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
    }
}

// Create and makeialize a new program object using the given shader source
// elements. Delete the program and rethrow on failure.

function newProgram(gl, vertId, fragId) {
    var program = gl.createProgram();
    try {
        makeProgram(gl, program, vertId, fragId);
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

