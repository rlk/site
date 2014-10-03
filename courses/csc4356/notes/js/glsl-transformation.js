
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
