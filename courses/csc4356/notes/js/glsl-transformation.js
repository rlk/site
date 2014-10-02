
var vertex_shader_source =
    'uniform   mat4 Model;\n' +
    'attribute vec4 vPosition;\n' +
    'void main() {\n' +
    '    gl_Position = Model * vPosition;\n' +
    '}\n';

var fragment_shader_source =
    'void main() {\n' +
    '    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n' +
    '}\n';
