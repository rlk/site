# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 2

The objective of this project is to implement the quick-sort algorithm with different pivot strategies and examine its behavior for different sequences of integer values.

See Chapter 11 of Goodrich (C++) or Chapter 12 of Goodrich (Java) for the details of the basic implementation.

- (5 points) To quantify the performance of the algorithm for a given input, we'll count the number of *comparison* operations performed. Add a counter to your implementation:

	&emsp;int numberOfComparisons

	And implement functions to perform integer comparison operations that increase the counter with each call:

	&emsp;bool lessThan(int a, int b)  
	&emsp;&emsp; numberOfComparisons++  
	&emsp;&emsp; return (a < b)

	&emsp;bool greaterThan(int a, int b)  
	&emsp;&emsp; numberOfComparisons++  
	&emsp;&emsp; return (a > b)

- (20 points) Implement the quick-sort in terms of these lessThan and greaterThan operations. Try to minimize the number of comparisons made in order to quantify the best possible performance of the algorithm. Use the *first* item pivot selection strategy. Call this program `Prog2A`.

- (10 points) Design your program to read input from a file containing a sequence of integers, one on each line. Sort the input, print the sorted list, and finally print the numberOfComparisons counted.

- (10 points) Duplicate your implementation and modify the copy to use the *median-of-three* pivot selection strategy. Call this program `Prog2B`.

- (10 points) Write two different input files containing sequences of 10 integers. The first input, `A-worse.txt` should cause a larger comparison count to be produced by `Prog2A` than by `Prog2B`. The second input, `B-worse.txt` should produce a larger count using `Prog2B` than `Prog2A`.

- (10 points) Code format matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. Points will be deducted for inconsistent formatting.

Implement this using as many classes and source files that you need, but:

- Java implementations should have main classes called `Prog2A` and `Prog2B` in files `Prog2A.java` and `Prog2B.java`.
- C++ implementations should have place the main functions in file `Prog2A.cpp` and `Prog2B.cpp`.

[Code submission should be done via your account on `classes.csc.lsu.edu`](classes.html) in a directory calleg `prog2`. The instructor's account name is `cs3102_koo`.
Include your both your implementation sources and your `A-worse.txt` and `B-worse.txt` input files.
