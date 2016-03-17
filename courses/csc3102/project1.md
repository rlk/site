# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 1

Implement, test, and apply a heap-based priority queue in either C++ or Java. Specifically, implement your heap using a zero-based array of characters, with the indexing scheme described in [the notes](topic5.html). You may assume that the array will contain no more than 255 elements. Call it PriorityQueue.

You'll use PriorityQueue in two programs: one to test it and one to apply it.

- (20 points) For the sake of testing, the class should provide the following non-heap debugging operations.

	- *clear*() eliminates all elements and sets the array size to zero.
	- *append*($a$) appends an element $a$ to the end of the array (regardless of the heap order property.)
	- *check*() confirm that the array satisfies the heap order property and returns *true* or *false* accordingly.

- (20 points) The class should also provide the following heap operations.

	- *size*() returns the number of elements in the heap.
	- *insert*($a$) adds an element $a$ to the heap, re-heapifying as necessary.
	- *remove*() deletes the front element from the heap, re-heapifying as necessary.

- (20 points) Test the heap operations by writing the following *unit tests*.

	&emsp; function test1(*Q*)  
	&emsp;&emsp; *Q*.clear()  
	&emsp;&emsp; *Q*.append('a')  
	&emsp;&emsp; *Q*.append('b')  
	&emsp;&emsp; assert *Q*.size() == 2  
	&emsp;&emsp; assert *Q*.check() == true  

	&emsp; function test2(*Q*)  
	&emsp;&emsp; *Q*.clear()  
	&emsp;&emsp; *Q*.append('b')  
	&emsp;&emsp; *Q*.append('a')  
	&emsp;&emsp; assert *Q*.size() == 2  
	&emsp;&emsp; assert *Q*.check() == false  

	&emsp; function test3(*Q*)  
	&emsp;&emsp; *Q*.clear()  
	&emsp;&emsp; *Q*.insert('a')  
	&emsp;&emsp; *Q*.insert('b')  
	&emsp;&emsp; assert *Q*.size() == 2  
	&emsp;&emsp; assert *Q*.check() == true  
	&emsp;&emsp; assert *Q*.remove() == 'a'  
	&emsp;&emsp; assert *Q*.size() == 1  

	&emsp; function test4(*Q*)  
	&emsp;&emsp; *Q*.clear()  
	&emsp;&emsp; *Q*.insert('b')  
	&emsp;&emsp; *Q*.insert('a')  
	&emsp;&emsp; assert *Q*.size() == 2  
	&emsp;&emsp; assert *Q*.check() == true  
	&emsp;&emsp; assert *Q*.remove() == 'a'  
	&emsp;&emsp; assert *Q*.size() == 1  

	Finally execute your test suite by implementing a program Prog1Test as follows:

	&emsp; function main()  
	&emsp;&emsp; *Q* = new PriorityQueue  
	&emsp;&emsp; test1(*Q*)  
	&emsp;&emsp; test2(*Q*)  
	&emsp;&emsp; test3(*Q*)  
	&emsp;&emsp; test4(*Q*)  

	Note that this test suite is *far* from comprehensive. Passing this simple, small set of tests does not confirm the correctness of your heap implementation.

	C++ users: You must `#include <cassert>` and make assertions like `assert(1 == 1);`.

	Java users: Make assertions like `assert 1 == 1;` and enable assertions on execution with `java -ea Prog1Test`.

- (20 points) Using only the *insert* and *remove* operations of your priority queue class, implement a program Prog1Application that transforms its input as follows:

	- Read a sequence of characters one-by-one.

	- If the character is a letter, insert it into the queue.

	- If the character is an exclamation point, remove the minimum (alphabetically first) character from the queue and print it to the output.

	- For example, given the following input:

			GEA!U!XT!!IGER!!!!!S!

		The program will produce this output

			AEGTEGIRUS

- (10 points) Code quality matters! Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function. Points will be deducted for inconsistently formatted or undocumented code.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog1` directory, using the procedure described in [project 0](project0.html). Remember to include your name and your LSU email address.

Be advised that the grading process may include unit tests and character sequences different from those given above. It is therefore smart to write a few of your own unit tests and example inputs to confirm that your implementation function correctly given other inputs.
