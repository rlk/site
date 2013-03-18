## [Generalized Perspective Projection][pdf]

*August 2008*

Perspective projection is a well-understood aspect of 3D graphics. It is not something that 3D programmers spend much time thinking about. Most OpenGL applications simply select a field of view, specify near and far clipping plane distances, and call gluPerspective or glFrustum. These functions suffice in the vast majority of cases. However, the field of Virtual Reality introduces circumstances under which they fail. [This article][pdf] discusses the limitations of these perspective projection functions, and describes a more generalized perspective projection formulation. An implementation and example application are provided.

[pdf]: pdfs/gen-perspective.pdf