// Copyright (c) 2013 Robert Kooima
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

#include <cassert>
#include <vector>
#include <string>
#include <tiffio.h>
#include <GL/glew.h>
#include <GLUT/glut.h>

//------------------------------------------------------------------------------

template <typename T> struct pixel { T r; T g; T b; };
template <typename T> struct image
{
    std::vector<pixel<T> > p;

    GLsizei w;
    GLsizei h;
    GLint   b;

    void read(TIFF *, GLint);
    void init(GLenum, GLint);
    void corner();

    pixel<T>& at(int r, int c) { return p[w * r + c]; }

    pixel<T>& atL(int r, int c) { return at(c, h - r - 1); }
    pixel<T>& atR(int r, int c) { return at(w - c - 1, r); }
};

template <typename T> void image<T>::read(TIFF *F, GLint d)
{
    uint32 n;
    uint32 m;
    uint16 s;

    TIFFGetField(F, TIFFTAG_IMAGEWIDTH,      &n);
    TIFFGetField(F, TIFFTAG_IMAGELENGTH,     &m);
    TIFFGetField(F, TIFFTAG_SAMPLESPERPIXEL, &s);

    if (n > 0 && m > 0 && s == 3)
    {
        w = GLsizei(n + 2 * d);
        h = GLsizei(m + 2 * d);
        b = d;

        p.reserve(w * h);

        for (uint32 r = 0; r < m; r++)
            TIFFReadScanline(F, &at(r + d, d), r);
    }
}

template <> void image<GLubyte>::init(GLenum t, GLint l)
{
    glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
    glTexImage2D(t, l, GL_RGB8, w, h, b, GL_RGB, GL_UNSIGNED_BYTE, p.data());
}

template <> void image<GLushort>::init(GLenum t, GLint l)
{
    glPixelStorei(GL_UNPACK_ALIGNMENT, 2);
    glTexImage2D(t, l, GL_RGB16, w, h, b, GL_RGB, GL_UNSIGNED_SHORT, p.data());
}

template <> void  image<GLfloat>::init(GLenum t, GLint l)
{
    glPixelStorei(GL_UNPACK_ALIGNMENT, 4);
    glTexImage2D(t, l, GL_RGB32F, w, h, b, GL_RGB, GL_FLOAT, p.data());
}

template <typename T> void avg(pixel<T>& a, pixel<T>& b,
                               pixel<T>& c, pixel<T>& d)
{
    d.r = a.r / 3 + b.r / 3 + c.r / 3;
    d.g = a.g / 3 + b.g / 3 + c.g / 3;
    d.b = a.b / 3 + b.b / 3 + c.b / 3;
}

template <typename T> void image<T>::corner()
{
    const int n = h - 1;
    const int m = h - 2;

     avg(at(0, 1), at(1, 0), at(1, 1), at(0, 0));
     avg(at(n, 1), at(m, 0), at(m, 1), at(n, 0));
     avg(at(0, m), at(1, n), at(1, m), at(0, n));
     avg(at(n, m), at(m, n), at(m, m), at(n, n));
}

//------------------------------------------------------------------------------

template <typename T> void init_corners(image<T> images[6])
{
    images[0].corner();
    images[1].corner();
    images[2].corner();
    images[3].corner();
    images[4].corner();
    images[5].corner();
}

template <typename T> void init_borders(image<T> images[6])
{
    const int n = images[0].h - 1;
    const int m = images[0].h - 2;

    for (int r = 1; r < n; r++)
    {
        images[0].at (r, n) = images[5].at (r, 1);
        images[5].at (r, 0) = images[0].at (r, m);

        images[5].at (r, n) = images[1].at (r, 1);
        images[1].at (r, 0) = images[5].at (r, m);

        images[1].at (r, n) = images[4].at (r, 1);
        images[4].at (r, 0) = images[1].at (r, m);

        images[4].at (r, n) = images[0].at (r, 1);
        images[0].at (r, 0) = images[4].at (r, m);

        images[1].atR(r, n) = images[2].at (r, 1);
        images[2].at (r, 0) = images[1].atR(r, m);

        images[1].atL(r, n) = images[3].at (r, 1);
        images[3].at (r, 0) = images[1].atL(r, m);

        images[2].at (r, n) = images[0].atL(r, 1);
        images[0].atL(r, 0) = images[2].at (r, m);

        images[3].at (r, n) = images[0].atR(r, 1);
        images[0].atR(r, 0) = images[3].at (r, m);

        images[2].atL(r, n) = images[4].atL(r, 1);
        images[4].atL(r, 0) = images[2].atL(r, m);

        images[2].atR(r, n) = images[5].atL(r, 1);
        images[5].atL(r, 0) = images[2].atR(r, m);

        images[3].atL(r, n) = images[5].atR(r, 1);
        images[5].atR(r, 0) = images[3].atL(r, m);

        images[3].atR(r, n) = images[4].atR(r, 1);
        images[4].atR(r, 0) = images[3].atR(r, m);
    }
}

template <typename T> GLuint init_cubemap(image<T> images[6], GLenum wrap)
{
    GLuint texture;

    glGenTextures  (1, &texture);
    glBindTexture  (GL_TEXTURE_CUBE_MAP, texture);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, wrap);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, wrap);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, wrap);

    for (int i = 0; i < 6; i++)
        images[i].init(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0);

    return texture;
}

template <typename T> GLuint init_texture(TIFF *in)
{
    image<T> images[6];

    for (int i = 0; i < 6 && TIFFSetDirectory(in, i); i++)
        images[i].read(in, 0);

    // glEnable(GL_TEXTURE_CUBE_MAP_SEAMLESS);
    // init_borders(images);
    // init_corners(images);

    return init_cubemap(images, GL_REPEAT);
}

GLuint init_texture(const std::string& name)
{
    GLuint texture = 0;

    if (TIFF *in = TIFFOpen(name.c_str(), "r"))
    {
        uint16 b;

        TIFFGetField(in, TIFFTAG_BITSPERSAMPLE, &b);

        if      (b ==  8) texture = init_texture<GLubyte >(in);
        else if (b == 16) texture = init_texture<GLushort>(in);
        else if (b == 32) texture = init_texture<GLfloat >(in);

        TIFFClose(in);
    }
    return texture;
}

//------------------------------------------------------------------------------

static const GLchar *vert_src =
    "void main()                              \n"
    "{                                        \n"
    "    gl_TexCoord[0].xyz = gl_Normal;      \n"
    "    gl_Position = ftransform();          \n"
    "}                                        \n";

static const GLchar *frag_src =
    "uniform samplerCube cube;                                            \n"
    "void main()                                                          \n"
    "{                                                                    \n"
    "    gl_FragColor = textureCube(cube, normalize(gl_TexCoord[0].xyz)); \n"
    "}                                                                    \n";

// Compile, link, and apply the shaders.

static void init_program()
{
    GLuint vert = glCreateShader(GL_VERTEX_SHADER);
    GLuint frag = glCreateShader(GL_FRAGMENT_SHADER);
    GLuint prog = glCreateProgram();

    glShaderSource (vert, 1, &vert_src, 0);
    glShaderSource (frag, 1, &frag_src, 0);
    glCompileShader(vert);
    glCompileShader(frag);

    glAttachShader(prog, vert);
    glAttachShader(prog, frag);
    glLinkProgram (prog);
    glUseProgram  (prog);
    glUniform1i(glGetUniformLocation(prog, "cube"), 0);
}

//------------------------------------------------------------------------------

// Camera state

static GLdouble theta = -45.0;
static GLdouble phi   = -36.0;
static GLdouble zoom  =   0.1;

// Respond to key presses with changes to the camera state.

static void special(int k, int x, int y)
{
    switch (k)
    {
        case GLUT_KEY_LEFT:      theta -= 1.00f; break;
        case GLUT_KEY_RIGHT:     theta += 1.00f; break;
        case GLUT_KEY_UP:        phi   -= 1.00f; break;
        case GLUT_KEY_DOWN:      phi   += 1.00f; break;
        case GLUT_KEY_PAGE_UP:   zoom  -= 0.01f; break;
        case GLUT_KEY_PAGE_DOWN: zoom  += 0.01f; break;
    }
    glutPostRedisplay();
}

// Set the projection and movelview matrices. Draw the scene.

static void display()
{
    const GLint    w = glutGet(GLUT_WINDOW_WIDTH);
    const GLint    h = glutGet(GLUT_WINDOW_HEIGHT);
    const GLdouble a = GLdouble(w) / GLdouble(h);

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glFrustum(-zoom * a, zoom * a, -zoom, zoom, 1.0, 10.0);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    glRotated(phi,   1.0, 0.0, 0.0);
    glRotated(theta, 0.0, 0.1, 0.0);

    glViewport(0, 0, w, h);
    glClear(GL_COLOR_BUFFER_BIT);
    glutSolidSphere(5.0, 16, 16);
    glutSwapBuffers();
}

//------------------------------------------------------------------------------

// Start GLUT, initialize the OpenGL state, and run.

int main(int argc, char *argv[])
{
    glutInitDisplayMode(GLUT_DOUBLE);
    glutInitWindowSize(640, 480);
    glutInit(&argc, argv);

    glutCreateWindow(argv[0]);
    glutDisplayFunc(display);
    glutSpecialFunc(special);

    if (glewInit() == GLEW_OK)
    {
        init_texture(argv[1]);
        init_program();
        glutMainLoop();
    }
    return 0;
}
