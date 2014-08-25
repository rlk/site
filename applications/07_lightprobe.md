## [Lightprobe Composer][lightprobe]

*Summer 2011, Summer 2012*

Lightprobe Composer interactively converts high dynamic range lightprobe (mirror sphere) images to usable environment maps. The GUI is implemented in Racket 5.1 with domain-specific extensions in C and image processing in GLSL. All Racket, C, and GLSL code is [available here][lightprobe] under the terms of the [GNU GPL][gpl]. One or more HDR lightprobe photographs are loaded in TIFF format and their alignment is interactively tuned. Output may be produced in cube map, sphere map, and dome master forms. Here is [an example lightprobe][example] (13 MB) captured during a [graphics lecture][csc4356]. This is converted to spheremap it the screenshot at the left.

[lightprobe]: applications/lightprobe/lightprobe-2552.zip
[gpl]:        http://www.gnu.org/copyleft/gpl.html
[example]:    http://www.cct.lsu.edu/~rkooima/images/classroom.tif
[csc4356]:    courses/csc4356/index.html
