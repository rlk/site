// Copyright (c) 2015 Robert Kooima

// Requires gl-shader.js
// Requires gl-matrix.js

//------------------------------------------------------------------------------

function DemoMultitexture(id) {
    var that = this;

     // Initialize the canvas.

    this.canvas = document.getElementById(id);

    this.modelRotationX   = 30;
    this.modelRotationY   = 91;
    this.viewTranslationZ = 5;

    this.lastClientX      = 0;
    this.lastClientY      = 0;
    this.dragging         = false;

    // Initialize the event handlers.

    this.canvas.onmousedown = function(event) {
        that.lastClientX = event.clientX;
        that.lastClientY = event.clientY;
        that.dragging = true;
    }

    this.canvas.onmouseup = function(event) {
        that.dragging = false;
    }

    this.canvas.onmousemove = function(event) {
        if (that.dragging) {
            that.modelRotationY = that.modelRotationY + event.clientX - that.lastClientX;
            that.modelRotationX = that.modelRotationX + event.clientY - that.lastClientY;

            if (that.modelRotationX > 90.0) {
                that.modelRotationX = 90.0;
            }
            if (that.modelRotationX < -90.0) {
                that.modelRotationX = -90.0;
            }

            if (that.modelRotationY >  180.0) {
                that.modelRotationY -= 360.0;
            }
            if (that.modelRotationY < -180.0) {
                that.modelRotationY += 360.0;
            }
        }
        that.lastClientX = event.clientX;
        that.lastClientY = event.clientY;
    }

    // Initialize the WebGL context.

    this.gl = this.canvas.getContext('webgl');

    this.initShaders (this.gl);
    this.initBuffers (this.gl);
    this.initTextures(this.gl);

    // Set up to render.

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
}

//------------------------------------------------------------------------------

var vertexSource = [
    'precision mediump float;',

    'uniform mat4 projectionMatrix;',
    'uniform mat4       viewMatrix;',
    'uniform mat4      modelMatrix;',

    'uniform vec4 lightPosition;',

    'attribute vec4 vertexPosition;',
    'attribute vec2 vertexTexCoord;',

    'varying vec3 fragmentView;',
    'varying vec3 fragmentLight;',
    'varying vec3 fragmentNormal;',
    'varying vec2 fragmentTexCoord;',

    'void main() {',
    '    mat4 M =      viewMatrix * modelMatrix;',
    '    mat3 N = mat3(viewMatrix * modelMatrix);',

    '    fragmentView     = -normalize(vec3(M * vertexPosition));',
    '    fragmentNormal   =  normalize(N * vec3(vertexPosition));',
    '    fragmentLight    =  normalize(N * vec3( lightPosition));',
    '    fragmentTexCoord =  vertexTexCoord;',

    '    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;',
    '}'
].join('\n');

var fragmentSource = [
    'precision mediump float;',

    'uniform sampler2D colorTexture;',
    'uniform sampler2D waterTexture;',
    'uniform sampler2D lightTexture;',
    'uniform sampler2D cloudTexture;',

    'varying vec3 fragmentView;',
    'varying vec3 fragmentLight;',
    'varying vec3 fragmentNormal;',
    'varying vec2 fragmentTexCoord;',

    'void main() {',
    '    vec3 N = normalize(fragmentNormal);',
    '    vec3 L = normalize(fragmentLight);',
    '    vec3 V = normalize(fragmentView);',
    '    vec3 R = reflect(-L, N);',

    '    vec3 color = texture2D(colorTexture, fragmentTexCoord).rgb;',
    '    vec3 water = texture2D(waterTexture, fragmentTexCoord).rgb;',
    '    vec3 light = texture2D(lightTexture, fragmentTexCoord).rgb;',
    '    vec3 cloud = texture2D(cloudTexture, fragmentTexCoord).rgb;',

    '    float kd =     max(dot(N, L), 0.0);',
    '    float ks = pow(max(dot(R, V), 0.0), 8.0) * 0.5;',

    '    vec3 k = mix(mix(light,              vec3(0.1, 0.1, 0.3), cloud.r),',
    '                 mix(color + water * ks, vec3(1.0, 1.0, 1.0), cloud.r), kd);',

    '    gl_FragColor = vec4(k, 1.0);',
    '}\n'
].join('\n');

// Initialize the program object and its uniform and attribute locations.

DemoMultitexture.prototype.initShaders = function(gl) {

    try {
        this.program = newProgram(gl, vertexSource, fragmentSource);
    }
    catch (e) {
        console.log(e.message);
    }

    gl.useProgram(this.program);

    this.vertexPositionLocation = gl.getAttribLocation(this.program, 'vertexPosition');
    this.vertexTexCoordLocation = gl.getAttribLocation(this.program, 'vertexTexCoord');

    gl.enableVertexAttribArray(this.vertexPositionLocation);
    gl.enableVertexAttribArray(this.vertexTexCoordLocation);

    this.projectionMatrixLocation = gl.getUniformLocation(this.program, 'projectionMatrix');
    this.      viewMatrixLocation = gl.getUniformLocation(this.program,       'viewMatrix');
    this.     modelMatrixLocation = gl.getUniformLocation(this.program,      'modelMatrix');
    this.   lightPositionLocation = gl.getUniformLocation(this.program,    'lightPosition');

    gl.uniform1i(gl.getUniformLocation(this.program, 'colorTexture'), 0);
    gl.uniform1i(gl.getUniformLocation(this.program, 'waterTexture'), 1);
    gl.uniform1i(gl.getUniformLocation(this.program, 'lightTexture'), 2);
    gl.uniform1i(gl.getUniformLocation(this.program, 'cloudTexture'), 3);
}

// Initialize vertex and index buffer objects.

DemoMultitexture.prototype.initBuffers = function(gl) {
    var n = 64;
    var m = 128;

    var positions = [];
    var texCoords = [];
    var triangles = [];

    // Generate the vertices of a sphere.

    for     (var i = 0; i <= n; ++i) {
        for (var j = 0; j <= m; ++j) {

            var s =  j / m;
            var t =  i / n;

            var x = -(Math.sin(2.0 * Math.PI * s) * Math.sin(Math.PI * t));
            var y = -(                              Math.cos(Math.PI * t));
            var z = -(Math.cos(2.0 * Math.PI * s) * Math.sin(Math.PI * t));

            positions.push(x, y, z);
            texCoords.push(s, t);
        }
    }

    // Generate the triangles of a sphere.

    for     (var i = 0; i < n; ++i) {
        for (var j = 0; j < m; ++j) {

            var a = (i    ) * (m + 1) + (j    );
            var b = (i    ) * (m + 1) + (j + 1);
            var c = (i + 1) * (m + 1) + (j    );
            var d = (i + 1) * (m + 1) + (j + 1);

            triangles.push(a, b, d);
            triangles.push(d, c, a);
        }
    }

    // Copy the geometry to vertex buffers.

    var positionArray = new Float32Array(positions);
    var texCoordArray = new Float32Array(texCoords);
    var triangleArray = new Uint16Array (triangles);

    this.positionBuffer = gl.createBuffer();
    this.texCoordBuffer = gl.createBuffer();
    this.triangleBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoordArray, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);

    this.elementCount = triangleArray.length;
}

DemoMultitexture.prototype.initTextures = function(gl) {

    var that = this;

    function load(unit, image, texture) {
        gl.activeTexture(unit);

        gl.bindTexture  (gl.TEXTURE_2D, texture);
        gl.texImage2D   (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE);

        requestAnimationFrame(function() { that.draw() });
    }

    // Initialize all textures.

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    this.colorTexture = gl.createTexture();
    this.waterTexture = gl.createTexture();
    this.lightTexture = gl.createTexture();
    this.cloudTexture = gl.createTexture();

    var colorImage = new Image();
    var waterImage = new Image();
    var lightImage = new Image();
    var cloudImage = new Image();

    colorImage.onload = function() { load(gl.TEXTURE0, colorImage, that.colorTexture); }
    waterImage.onload = function() { load(gl.TEXTURE1, waterImage, that.waterTexture); }
    lightImage.onload = function() { load(gl.TEXTURE2, lightImage, that.lightTexture); }
    cloudImage.onload = function() { load(gl.TEXTURE3, cloudImage, that.cloudTexture); }

    colorImage.src = "../img/earth-color.jpg";
    waterImage.src = "../img/earth-water.jpg";
    lightImage.src = "../img/earth-light.jpg";
    cloudImage.src = "../img/earth-cloud.jpg";
}

//------------------------------------------------------------------------------

DemoMultitexture.prototype.draw = function(time) {
    var that = this;
    var gl   = this.gl;

    // Compute and apply the transform.

    var a = this.canvas.width / this.canvas.height;
    var P = mat4.create();
    var V = mat4.create();
    var M = mat4.create();

    mat4.perspective(P, glMatrix.toRadian(30), a, 0.1, 20);

    mat4.translate(V, V, vec3.fromValues(0, 0, -this.viewTranslationZ));

    mat4.rotateX(M, M, glMatrix.toRadian(this.modelRotationX));
    mat4.rotateY(M, M, glMatrix.toRadian(this.modelRotationY));

    gl.uniformMatrix4fv(this.projectionMatrixLocation, false, P);
    gl.uniformMatrix4fv(this.      viewMatrixLocation, false, V);
    gl.uniformMatrix4fv(this.     modelMatrixLocation, false, M);

    gl.uniform4f(this.lightPositionLocation, 100 * Math.sin(time / 1000), 0,
                                             100 * Math.cos(time / 1000), 1);

    // Set up the textures.

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.cloudTexture);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.lightTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.waterTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);

    // Render the object.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.vertexAttribPointer(this.vertexTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    gl.drawElements(gl.TRIANGLES, this.elementCount, gl.UNSIGNED_SHORT, 0);

    // Animate.

    requestAnimationFrame(function(t) { that.draw(t) });
}

//------------------------------------------------------------------------------
