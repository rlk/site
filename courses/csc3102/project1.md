# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 1

Implement and use a heap-based priority queue in either C++ or Java. Specifically:

- (40 points) Implement a heap-based priority queue class using the vector representation, containing characters. You may assume that the heap will contain no more than 255 elements.

- (40 points) Using your priority queue class, implement a program that transforms its input as follows:

	- Read a sequence of characters one-by-one.

	- If the character is a letter, insert it into the queue.

	- If the character is an exclamation point, remove the minimum (alphabetically first) character from the queue and print it to the output.

	- For example, given the following input:

			GEA!U!XT!!IGER!!!!!S!

		The program will produce this output

			AEGTEGIRUS

- (10 points) Code quality matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function. Points will be deducted for inconsistently formatted or undocumented code.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog1` directory, using the procedure described in [project 0](project0.html). Remember to include your name and your LSU email address.

Implement this using as many classes and source files that you need, but:

- Java implementations should have a main class called `Prog1` in a file `Prog1.java`.
- C++ implementations should have place the main function in a file `Prog1.cpp`
