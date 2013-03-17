## [OBJ Library][obj]

Like many 3D graphics developers, I've developed a [library of functions][obj] for loading, storing, and rendering 3D models in the OBJ file format. This library also provides an API for building, manipulating, and transforming OBJ model data. It automatically computes tangent and bi-tangent vectors for use in tangent-space surface mapping. It is capable of computing a model's average cache miss ratio (ACMR), and sorting index data to minimize this value and thus maximize rendering performance. The library supports the full OBJ and MTL specifications, with the exception of OBJ free-form curves.

[obj]: util3d/obj.html
