// Copyright (c) 2015 Robert Kooima

// Requires gl-shader.js
// Requires gl-matrix.js

//------------------------------------------------------------------------------

var vertexSource = [
    'uniform   mat4 projectionMatrix;',
    'uniform   mat4 viewMatrix;',
    'uniform   mat4 modelMatrix;',
    'attribute vec4 vertexPosition;',
    'attribute vec2 vertexTexCoord;',
    'varying mediump vec2 fragmentTexCoord;',
    'void main() {',
    '    fragmentTexCoord = vertexTexCoord;',
    '    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;',
    '}'
].join('\n');

var fragmentSource = [
    'uniform sampler2D diffuseTexture;',
    'varying mediump vec2 fragmentTexCoord;',
    'void main() {',
    '    gl_FragColor = texture2D(diffuseTexture, fragmentTexCoord);',
    '}\n'
].join('\n');

//------------------------------------------------------------------------------

function DemoTexture(id, object, image) {
    try {
        var that = this;

        // Initialize the canvas.

        this.canvas = document.getElementById(id);

        this.modelRotationX   = 10;
        this.modelRotationY   = 45;
        this.viewTranslationZ = 5;

        this.lastClientX      = 0;
        this.lastClientY      = 0;
        this.dragging         = false;

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

                requestAnimationFrame(function() { that.draw() });
            }
            that.lastClientX = event.clientX;
            that.lastClientY = event.clientY;
        }

        // Initialize the WebGL context.

        this.gl = this.canvas.getContext('webgl');

        // Initialize the program object and its uniform and attribute locations.

	    this.program = newProgram(this.gl, vertexSource, fragmentSource);

        this.gl.useProgram(this.program);

        this.projectionMatrixLocation = this.gl.getUniformLocation(this.program, 'projectionMatrix');
        this.      viewMatrixLocation = this.gl.getUniformLocation(this.program,       'viewMatrix');
        this.     modelMatrixLocation = this.gl.getUniformLocation(this.program,      'modelMatrix');

        this.vertexPositionLocation = this.gl.getAttribLocation(this.program, 'vertexPosition');
        this.vertexTexCoordLocation = this.gl.getAttribLocation(this.program, 'vertexTexCoord');

        this.gl.enableVertexAttribArray(this.vertexPositionLocation);
        this.gl.enableVertexAttribArray(this.vertexTexCoordLocation);

        // Initialize vertex and index buffer objects.

        positionArray = new Float32Array(object.positions);
        texCoordArray = new Float32Array(object.texCoords);
        triangleArray = new Uint16Array (object.triangles);

        this.positionBuffer = this.gl.createBuffer();
        this.texCoordBuffer = this.gl.createBuffer();
        this.triangleBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoordArray, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, triangleArray, this.gl.STATIC_DRAW);

        this.elementCount = triangleArray.length;

        // Initialize the texture.

        this.modelTexture = this.gl.createTexture();

        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.modelImage        = new Image();
        this.modelImage.onload = function() {
            that.gl.bindTexture   (that.gl.TEXTURE_2D, that.modelTexture);
            that.gl.texImage2D    (that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, that.modelImage);
            that.gl.generateMipmap(that.gl.TEXTURE_2D);
            requestAnimationFrame(function() { that.draw() });
        }
        this.modelImage.crossOrigin = "anonymous";
        this.modelImage.src         = image;

        this.minFilter = this.gl.LINEAR;
        this.magFilter = this.gl.LINEAR;
        this.wrapS     = this.gl.REPEAT;
        this.wrapT     = this.gl.REPEAT;

        // Set up to render.

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.SRC_ALPHA_MINUS_ONE);

        this.gl.clearColor(0.8, 0.8, 0.8, 1.0);

    } catch (e) {
        console.log(e.message);
    }
}

DemoTexture.prototype.draw = function() {
    // Compute and apply the transform.

    var a = this.canvas.width / this.canvas.height;
    var P = mat4.create();
    var V = mat4.create();
    var M = mat4.create();

    mat4.perspective(P, glMatrix.toRadian(45), a, 0.1, 20);

    mat4.translate(V, V, vec3.fromValues(0, 0, -this.viewTranslationZ));

    mat4.rotateX(M, M, glMatrix.toRadian(this.modelRotationX));
    mat4.rotateY(M, M, glMatrix.toRadian(this.modelRotationY));

    this.gl.uniformMatrix4fv(this.projectionMatrixLocation, false, P);
    this.gl.uniformMatrix4fv(this.      viewMatrixLocation, false, V);
    this.gl.uniformMatrix4fv(this.     modelMatrixLocation, false, M);

    // Set up the texture.

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.modelTexture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S,     this.wrapS);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T,     this.wrapT);

    // Render the object.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(this.vertexPositionLocation, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.vertexAttribPointer(this.vertexTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    this.gl.drawElements(this.gl.TRIANGLES, this.elementCount, this.gl.UNSIGNED_SHORT, 0);
}

//------------------------------------------------------------------------------

function DemoTextureClamp(id, object, image) {
    DemoTexture.call(this, id, object, image);
    this.wrapS = this.gl.CLAMP_TO_EDGE;
    this.wrapT = this.gl.CLAMP_TO_EDGE;
    this.modelRotationX = 90;
    this.modelRotationY =  0;
}

function DemoTextureRepeat(id, object, image) {
    DemoTexture.call(this, id, object, image);
    this.wrapS = this.gl.REPEAT;
    this.wrapT = this.gl.REPEAT;
    this.modelRotationX = 90;
    this.modelRotationY =  0;
}

function DemoTextureLinearLinear(id, object, image) {
    DemoTexture.call(this, id, object, image);
    this.minFilter = this.gl.LINEAR;
    this.magFilter = this.gl.LINEAR;
}

function DemoTextureNearestNearest(id, object, image) {
    DemoTexture.call(this, id, object, image);
    this.minFilter = this.gl.NEAREST;
    this.magFilter = this.gl.NEAREST;
}

function DemoTextureMipmapNearest(id, object, image) {
    DemoTexture.call(this, id, object, image);
    this.minFilter = this.gl.LINEAR_MIPMAP_LINEAR;
    this.magFilter = this.gl.NEAREST;
}

DemoTextureClamp.prototype = Object.create(DemoTexture.prototype);
DemoTextureClamp.prototype.constructor = DemoTextureClamp;

DemoTextureRepeat.prototype = Object.create(DemoTexture.prototype);
DemoTextureRepeat.prototype.constructor = DemoTextureRepeat;

DemoTextureLinearLinear.prototype = Object.create(DemoTexture.prototype);
DemoTextureLinearLinear.prototype.constructor = DemoTextureLinearLinear;

DemoTextureNearestNearest.prototype = Object.create(DemoTexture.prototype);
DemoTextureNearestNearest.prototype.constructor = DemoTextureNearestNearest;

DemoTextureMipmapNearest.prototype = Object.create(DemoTexture.prototype);
DemoTextureMipmapNearest.prototype.constructor = DemoTextureMipmapNearest;

//------------------------------------------------------------------------------

function DemoTextureZoom(id, object, image) {
    DemoTexture.call(this, id, object, image);

    var that   = this;

    this.modelRotationX   = 90;
    this.modelRotationY   = 0;
    this.viewTranslationZ = 5;

    this.canvas.onmousemove = function(event) {
        if (that.dragging) {
            that.viewTranslationZ = that.viewTranslationZ - (event.clientY - that.lastClientY) / 100.0;

            if (that.viewTranslationZ > 20.0) {
                that.viewTranslationZ = 20.0;
            }
            if (that.viewTranslationZ < 0.5) {
                that.viewTranslationZ = 0.5;
            }
            requestAnimationFrame(function() { that.draw() });
        }
        that.lastClientX = event.clientX;
        that.lastClientY = event.clientY;
    }
}

function DemoTextureNearestZoom(id, object, image) {
    DemoTextureZoom.call(this, id, object, image);

    this.minFilter = this.gl.NEAREST;
    this.magFilter = this.gl.NEAREST;
}

function DemoTextureLinearZoom(id, object, image) {
    DemoTextureZoom.call(this, id, object, image);

    this.minFilter = this.gl.LINEAR;
    this.magFilter = this.gl.LINEAR;
}

function DemoTextureMipmapZoom(id, object, image) {
    DemoTextureZoom.call(this, id, object, image);

    this.minFilter = this.gl.LINEAR_MIPMAP_LINEAR;
    this.magFilter = this.gl.LINEAR;
}

DemoTextureZoom.prototype = Object.create(DemoTexture.prototype);
DemoTextureZoom.prototype.constructor = DemoTextureZoom;

DemoTextureNearestZoom.prototype = Object.create(DemoTextureZoom.prototype);
DemoTextureNearestZoom.prototype.constructor = DemoTextureNearestZoom;

DemoTextureLinearZoom.prototype = Object.create(DemoTextureZoom.prototype);
DemoTextureLinearZoom.prototype.constructor = DemoTextureLinearZoom;

DemoTextureMipmapZoom.prototype = Object.create(DemoTextureZoom.prototype);
DemoTextureMipmapZoom.prototype.constructor = DemoTextureMipmapZoom;


//------------------------------------------------------------------------------


