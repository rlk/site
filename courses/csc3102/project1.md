# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 1

Implement a heap sort in either C++ or Java. Specifically:

- (5 points) Input will consist of a file containing a sequence of integers, one on each line. Read them into a list container. Here is an [example input](unsorted.txt).

- (30 points) Implement a heap-based priority queue class (Sec 8.1.3) using the vector representation (Sec 7.3.5). You may assume that the heap will contain no more than 1023 elements.

- (10 points) Implement the priority queue sorting scheme (C++ Sec 8.1.5) (Java Sec 8.1.4) using your input list L and a priority queue object P. A translation of the following pseudocode must appear:

	&emsp; while not L.empty()  
	&emsp;&emsp; P.insert(L.front())  
	&emsp;&emsp; L.removeFront()  
	&emsp; while not P.empty()  
	&emsp;&emsp; L.insertBack(P.min())  
	&emsp;&emsp; P.removeMin();  

- (5 points) The sorted list should be printed to the standard output with one number on each line. Here is an [example output](sorted.txt).

- (10 points) Code format matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. Points will be deducted for inconsistent formatting.

Implement this using as many classes and source files that you need, but:

- Java implementations should have a main class called `Prog1` in a file `Prog1.java`.
- C++ implementations should have place the main function in a file `Prog1.cpp`

[Code submission should be done via your account on `classes.csc.lsu.edu`](classes.html) in a directory calleg `prog1`. The instructor's account name is `cs3102_koo`.