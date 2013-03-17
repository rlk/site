## Tellurion

*2007&mdash;2011*

Tellurion implements a highly-scalable real-time planetary terrain composition algorithm. A GPGPU process tessellates terrain geometry in real time, and transitions smoothly from planet scale down to sub-meter resolution. Tellurion enables the investigation of a class of generalized terrain composition operators that merge data of widely disparate resolution, projection, and coverage on the fly. These composition operations are uniformly applicable to both terrain height maps and surface maps. The cluster-parallel renderer is supported by a multi-threaded data paging mechanism that performs view-dependant loading of data sources of arbitrary size. The system has been demonstrated displaying 115GB of data in real time, including height data covering the U.S. at a resolution of 30 meters. See the [installations page][installations] for a listing of several showings. Tellurion was my Ph.D. work. See my dissertation, [Planetary-scale Terrain Composition][dissertation], for detailed coverage or [this YouTube video][youtube] for an overview. I successfully [defended on October 23, 2008][defense], and a paper summarizing the technology was subsequently published in [IEEE Transactions on Visualization &amp; Computer Graphics][tvcg].

[installations]: installations.html
[dissertation]:  pdfs/Kooima-Dissertation.pdf
[youtube]:       http://www.youtube.com/watch?v=BVHRNYOUzcA
[defense]:       talks.html#defense
[tvcg]:          http://www.computer.org/portal/web/csdl/doi/10.1109/TVCG.2009.43