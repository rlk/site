# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 2

The objective of this project is to implement breadth-first and depth-first traversals of a directed graph data structure.

You may use any of the structures described in the textbook: the edge list, adjacency list, or the matrix data structure. See Chapter 13 of Goodrich (C++) or Chapter 14 of Goodrich (Java) for the details of the basic implementation. Be advised that the implementation given in the textbook is significantly overwrought for this application.

In previous projects, you were required to use only your language's basic array data type as the basis for your implementation. In this project, however, you're free to use your language's standard vectors, lists, sets, maps, stacks, queues. (As of this writing, there is no graph data structure among the standard Java collections or the C++ STL. If your implementation has one, obviously you should *not* use it.)

- (40 points) Implement a directed graph data structure class where each vertex is labeled with a single character.

	- Keep your class minimal. Implement only the operations that you need to produce the application described below. Any code that does not function will be considered "dead". This is a none-too-subtle requirement to encourage you to *understand* the code that you include instead of copying it from an external source.

- (40 points) Using your graph class, implement a program that transforms its input as follows:

	- Read a sequence of lines. Each line will have one of the following forms. Respond accordingly.

			add X Y

		Ensure that vertices with label X and Y are present in the graph and add a directed edge from X to Y.

			remove X Y

		Remove the edge from X to Y. Don't worry about removing any associated vertices.

			breadth X

		Print a breadth-first traversal of the graph beginning at the vertex labeled X.

			depth X

		Print a depth-first traversal of the graph beginning at the vertex labeled X.

		There's a potential ambiguity in the traversals. When enumerating the adjacent vertices, **enumerate them in the order in which they appeared in the input**. With this stipulation, there exists exactly one correct output for each traversal.
		
	- For example, given the following input:

			add A B
			add A C
			add B D
			add D E
			add E A
			add E B
			breadth A
			depth A
			remove A B
			add B A
			breadth B
			depth B
			
		The program will produce this output

			A B C D E
			A C B D E
			B D A E C
			B A C D E
			
- (10 points) Code quality matters. Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog2` directory, using the procedure described in [project 0](project0.html). Remember to include your name and your LSU email address.

Implement this using as many classes and source files that you need, but:

- Java implementations should have a main class called `Prog2` in a file `Prog2.java`.
- C++ implementations should have place the main function in a file `Prog2.cpp`
