<!DOCTYPE html>
<html>
<head>
	<title>Interactive Computer Graphics</title>
	<link rel="stylesheet" type="text/css" href="../style.css" />
	<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,http://csc.lsu.edu/~kooima/MathJax.js"></script>
	<script type="text/javascript" src="../script.js"></script>
	<script type="text/javascript" src="../js/gl-matrix.js"></script>
	<script type="text/javascript" src="../js/gl-shader.js"></script>
</head>
<body>
syscmd((cd ../01-geometry;       cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../02-buffer-objects; cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../03-transformation; cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../04-pipeline;       cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../05-lighting;       cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../06-viewer;         cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
syscmd((cd ../07-fragment;       cat .sequence.txt | xargs cat | awk '/section/,/\/section/'))
</body>
</html>