Assume 3 channels?

Border is deprecated in 3.0

http://www.opengl.org/wiki/Cubemap_Texture#Seamless_cubemap

We'll need to copy parts of each image into other images, so we'll need to have all six loaded into memory simultaneously. Without this requirement, we could simply load each page and upload it as a texture one-by-one.

The TIFF loader is written in such a way that it copies data directly from the TIFF into the texture without conversion. Thus, any image format defined by both TIFF and OpenGL is allowed. This includes the majority of commonly-used image formats.

If the image parameters don't match what OpenGL expects for a cube map, then an OpenGL error will be raised. This might occur if the image isn't square, if it's not power-of-two on hardware that requires it, if the pages aren't all the same size, or if the pages don't all have the same format.


The solution to the corner sampling issue is ambiguous. It depends upon whether vertical or horizontal sampling is performed first. It should be possible to devise a test to determing which is happening for a given GPU, and to structure cube maps accordingly.

The ultimate solution is to push the cube map abstraction beneath the filter. Keeping the filter beneath the image abstraction is a design win, and it's worth nothing this and quantifying any performance difference.

Optionally write the TIFF back out...

Show
	repeat (default)
	clamp         - no border
	clamp to edge - no border
	clamp         - border and corner
	seamless on


On
	NVIDIA OSX
	NVIDIA Linux
	Intel OSX

Render to cube map?

Alternatives:

- Bordering by hand in the fragment shader.
- Filtering by hand in the fragment shader
- Seamless cube map is default on DX10 and DX11. Available as an ARB extension. Not available on GL ES.
- Texture coordinate warping http://www.altdevblogaday.com/2012/03/03/seamless-cube-map-filtering/
- Edge fixup http://developer.amd.com/wordpress/media/2012/10/Isidoro-CubeMapFiltering-Sketch-SIG05.pdf
- ATI CubeMapGen http://developer.amd.com/wordpress/media/2012/10/GDC2005_CubeMapGen.pdf
- http://www.opengl.org/registry/specs/AMD/seamless_cubemap_per_texture.txt