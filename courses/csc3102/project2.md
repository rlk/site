# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 2

The objective of this project is to implement the insert and delete operators on a simple binary search tree, and to produce a level-by-level traversal of the resulting tree.

See Chapter 10 of Goodrich (C++) or Chapter 11 of Goodrich (Java) for the details of the basic implementation.

- (40 points) Implement a binary search tree class capable of storing integers.

	There are two points of ambiguity: In the case where an inserted value is already present in the tree, insert to the left. In the case where a deleted value has two internal children, seek the minimum value in the right subtree.

- (40 points) Using your binary search tree class, implement a program that transforms its input as follows:

	- Read a sequence of lines. Each line will have one of the following forms.

			insert N

		or 

			delete N

		where N is an integer value. Insert or delete that integer as indicated.

		After reading all input, print the tree to the output level-by-level. That is, print the root on one line, followed by the two nodes at level 1 on the second line, followed by the (up to) four nodes at level 2 on the next line, etc.

	- For example, given the following input:

			insert 5
			insert 20
			insert 3
			insert 4
			insert 9
			delete 4
			insert 7

		The program will produce this output

			5
			3 20
			9
			7

		Hint: the level-by-level output involves a breadth-first traversal of the tree.

- (10 points) Code quality matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function. Points will be deducted for inconsistently formatted or undocumented code.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog2` directory, using the procedure described in [project 0](project0.html). Remember to include your name and your LSU email address.

Implement this using as many classes and source files that you need, but:

- Java implementations should have a main class called `Prog2` in a file `Prog2.java`.
- C++ implementations should have place the main function in a file `Prog2.cpp`
