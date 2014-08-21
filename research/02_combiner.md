## [A GPU Sub-pixel Algorithm for Autostereoscopic Virtual Reality][ieeevr]

*Spring 2007*

The Varrier Combiner is a GPU-based algorithm performing real-time autostereoscopic sub-pixel spatial multiplexing. Such an algorithm is necessary for the correct function of parallax barrier displays such as the [Varrier][]. Prior to this work, autostereo interleaving was a very expensive process which placed a heavy performance burden upon all autostereo applications. By expressing the problem in terms of GLSL vertex and pixel shading, the computational expense is moved to the GPU, which eliminates the performance degradation completely. [Varrier Combiner][ieeevr] was presented at IEEE VR 07 and published in the conference proceedings. A [C module][combiner] implementing the algorithm may be used to port OpenGL applications to the Varrier.

[varrier]:  research.html#varrier
[ieeevr]:   pdfs/Kooima-VR07.pdf
[combiner]: code/varrier_combiner/varrier_combiner.html