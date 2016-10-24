# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 1

- (60 points) Implement and apply a heap-based priority queue in either C++ or Java. This priority queue will hold records consisting of:

	- A name string
	- An integer priority

	Implement your heap using a zero-based array of these records, with the indexing scheme described in [the notes](topic5.html). You may assume that the array will contain no more than 255 elements. Call this class PriorityQueue. Implement the following two functions:

	- *insert*(*name*, *priority*) takes a name string and priority value and inserts them into the priority queue.
	- *remove*() removes the record with the *highest* priority value and returns the name string from that record.

	Keep your class minimal. Implement only the operations that you need to produce the application described below. Any code that does not function will be considered "dead". This is a none-too-subtle requirement to encourage you to *understand* the code that you include instead of copying it from an external source.

- (20 points) Using the *insert* and *remove* operations of your priority queue class, implement a program that transforms its input as follows:

	- Read a sequence of lines. Each line will have one of the following forms. Respond accordingly.

			insert Abcdef 99

		Insert a new record with the given name and priority.

			remove

		Remove the highest priority record and print the name.

	- Here's an example input:

			insert Walter   21
			remove
			insert Matthew  13
			insert Hermine  8
			insert Lisa     12
			insert Julia    10
			remove
			remove
			insert Richard  17
			remove
			remove
			insert Tobias   19
			insert Karl     11
			insert Ian       9
			insert Nicole   14
			remove
			insert Bonnie   2
			insert Paula    16
			remove
			insert Alex     1
			remove
			remove
			insert Otto     15
			remove
			remove
			remove
			insert Gaston   7
			remove
			insert Virginie 20
			insert Danielle 4
			insert Earl     5
			insert Fiona    6
			insert Shary    18
			insert Colin    3
			remove
			remove
			remove

		The program will produce this output

			Walter
			Matthew
			Lisa
			Richard
			Julia
			Tobias
			Paula
			Nicole
			Karl
			Otto
			Ian
			Hermine
			Gaston
			Virginie
			Shary
			Fiona

- (10 points) Code quality matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function. Points will be deducted for inconsistently formatted or undocumented code.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog1` directory, using the procedure described in [project 0](project0.html). Your program must read from the input file named on the command line, just as in project 0. Remember to include your name and your LSU email address.

Be advised that the grading process input different from those given above. It is therefore smart to write your own example inputs to confirm that your implementation functions correctly.
