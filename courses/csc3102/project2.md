# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Programming Project 2

The objective of this project is to implement balanced binary search tree insertion and removal using the AVL tree algorithm.

- (40 points) Implement an AVL tree class with *insert* and *remove* functions. Tree will hold records consisting of:

    - A name string
    - An integer data value
    - A height value

    The name string should be used as the "key" value. That is, the tree should be organized alphabetically by name.

    You're free to adapt the implementation given in Chapter 10 of the C++ textbook, or Chapter 11 of the Java textbook, or the functional-style implementation given in the course notes. The most effective implementation of this will define a class to represent a tree node and dynamically instantiate individual nodes as needed. It is *not* necessary to implement this data structure atop an array as with prior projects.

    In the case of a duplicate insertion, insert on the left. In the case of a removal on a node with two internal children, replace with the successor (the minimum key in the right subtree). In the case where restructuring encounters two children of equal height, use either the LL or RR restructure instead of the LR or RL.
    
- (10 points) Implement a recursive *show* function to print the AVL tree's keys and values to the screen, indented with four spaces per level to indicate depth. Like so:

        Colin 3
            Bonnie 2
                Alex 1
            Earl 5
                Danielle 4
                Fiona 6

    Here, Colin is the root node, and Bonnie and Earl are its left and right children, etc.

- (30 points) Using your AVL tree class, implement a program that transforms its input as follows:

    - Read a sequence of lines. Each line will have one of the following forms. Respond accordingly.

            insert Alex 1

        Insert the name Alex and the value 8 into the AVL tree.

            remove Alex

        Remove the name Alex and its value from the AVL tree.

            show

        Print the AVL tree to the screen, as indicated above.
        
    - For example, given the following input:

            insert Earl 5
            insert Colin 3
            insert Fiona 6
            show
            insert Bonnie 2
            insert Danielle 4
            show
            insert Alex 1
            show
            remove Bonnie
            remove Alex
            show

        The program should produce this output

            Earl 5
                Colin 3
                Fiona 6
            Earl 5
                Colin 3
                    Bonnie 2
                    Danielle 4
                Fiona 6
            Colin 3
                Bonnie 2
                    Alex 1
                Earl 5
                    Danielle 4
                    Fiona 6
            Earl 5
                Colin 3
                    Danielle 4
                Fiona 6

- (10 points) Code quality matters. Consistent indentation, spacing, and brace placement are critical details that communicate structure. An appropriate level of in line comments are necessary to communicate function. As before, dead code is bad. So if you adapt an existing implementation, be certain that you understand it and remove any unused code.

- (10 points) Test and submit your code on *classes.csc.lsu.edu* in the `prog2` directory, using the procedure described in [project 0](project0.html). Remember to include your name and your LSU email address.

Implement this using as many classes and source files that you need, but:

- Java implementations should have a main class called `Prog2` in a file `Prog2.java`.
- C++ implementations should have place the main function in a file `Prog2.cpp`
