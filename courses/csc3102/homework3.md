# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 3

1. (5 points) Draw all possible binary trees that store the values 0, 1, and 2. Also draw all possible AVL trees that store the values 0, 1, and 2.

1. (5 points) Write pseudocode that uses an AVL tree to produce a sorted list of $n$ values in $O(n\log n)$ time in the worst case.

1. (15 points) Assume a binary tree data as defined in Chapter 10 of the textbook. Beginning with an empty tree, draw the tree after each of the following operations.

	- Insert 9
	- Insert 12
	- Insert 12
	- Insert 10
	- Insert 11
	- Insert 8
	- Insert 6
	- Insert 7
	- Insert 13
	- Remove 9
	- Remove 11
	- Remove 6
	- Remove 12

1. (15 points) Redefine the tree operations as follows. Beginning again with an empty tree, draw the tree after each of the above operations.

	&emsp; insert($v$, $k$)  
	&emsp;&emsp; $w\gets$ search($v$, $k$)  
	&emsp;&emsp; if $w$ is internal  
	&emsp;&emsp;&emsp; return insert($w$.right, $k$)  
	&emsp;&emsp; else  
	&emsp;&emsp;&emsp; $w$.key $\gets k$  
	&emsp;&emsp;&emsp; $w$.left $\gets$ new node($w$, $\emptyset$, $\emptyset$)  
	&emsp;&emsp;&emsp; $w$.right $\gets$ new node($w$, $\emptyset$, $\emptyset$)  
	&emsp;&emsp;&emsp; return $w$  

	&emsp; remove($v$, $k$)  
	&emsp;&emsp; $w\gets$ search($v$, $k$)  
	&emsp;&emsp; if $w$ is external  
	&emsp;&emsp;&emsp; throw an error  
	&emsp;&emsp; else if $w$.left is internal and $w$.right is internal   
	&emsp;&emsp;&emsp; $y\gets$ findMax($w$.left)  
	&emsp;&emsp;&emsp; $w$.key $\gets y$.key  
	&emsp;&emsp;&emsp; replace($y$, $y$.left)  
	&emsp;&emsp; else if $w$.left is internal  
	&emsp;&emsp;&emsp; replace($w$, $w$.left)  
	&emsp;&emsp; else  
	&emsp;&emsp;&emsp; replace($w$, $w$.right)  

1. (15 points) Assume an AVL tree data as defined in Chapter 10 of the textbook. Beginning again with an empty tree, draw the tree after each of the above operations.

1. (5 points) Give a series of insertions that produces each of the following binary trees.

	<svg width="450" height="120"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="225" y1="20" x2="105" y2="50"/><line x1="225" y1="20" x2="345" y2="50"/><circle r="15" cx="225" cy="20"/><text x="225" y="25">4</text><line x1="105" y1="50" x2="45" y2="80"/><line x1="105" y1="50" x2="165" y2="80"/><circle r="15" cx="105" cy="50"/><text x="105" y="55">2</text><line x1="45" y1="80" x2="15" y2="110"/><line x1="45" y1="80" x2="75" y2="110"/><circle r="15" cx="45" cy="80"/><text x="45" y="85">1</text><rect width="16" height="16" x="7" y="102"/><rect width="16" height="16" x="67" y="102"/><line x1="165" y1="80" x2="135" y2="110"/><line x1="165" y1="80" x2="195" y2="110"/><circle r="15" cx="165" cy="80"/><text x="165" y="85">3</text><rect width="16" height="16" x="127" y="102"/><rect width="16" height="16" x="187" y="102"/><line x1="345" y1="50" x2="285" y2="80"/><line x1="345" y1="50" x2="405" y2="80"/><circle r="15" cx="345" cy="50"/><text x="345" y="55">6</text><line x1="285" y1="80" x2="255" y2="110"/><line x1="285" y1="80" x2="315" y2="110"/><circle r="15" cx="285" cy="80"/><text x="285" y="85">5</text><rect width="16" height="16" x="247" y="102"/><rect width="16" height="16" x="307" y="102"/><line x1="405" y1="80" x2="375" y2="110"/><line x1="405" y1="80" x2="435" y2="110"/><circle r="15" cx="405" cy="80"/><text x="405" y="85">7</text><rect width="16" height="16" x="367" y="102"/><rect width="16" height="16" x="427" y="102"/></svg><br>

	<svg width="390" height="180"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="105" y1="20" x2="45" y2="50"/><line x1="105" y1="20" x2="165" y2="50"/><circle r="15" cx="105" cy="20"/><text x="105" y="25">2</text><line x1="45" y1="50" x2="15" y2="80"/><line x1="45" y1="50" x2="75" y2="80"/><circle r="15" cx="45" cy="50"/><text x="45" y="55">1</text><rect width="16" height="16" x="7" y="72"/><rect width="16" height="16" x="67" y="72"/><line x1="165" y1="50" x2="135" y2="80"/><line x1="165" y1="50" x2="225" y2="80"/><circle r="15" cx="165" cy="50"/><text x="165" y="55">3</text><rect width="16" height="16" x="127" y="72"/><line x1="225" y1="80" x2="195" y2="110"/><line x1="225" y1="80" x2="345" y2="110"/><circle r="15" cx="225" cy="80"/><text x="225" y="85">4</text><rect width="16" height="16" x="187" y="102"/><line x1="345" y1="110" x2="285" y2="140"/><line x1="345" y1="110" x2="375" y2="140"/><circle r="15" cx="345" cy="110"/><text x="345" y="115">6</text><line x1="285" y1="140" x2="255" y2="170"/><line x1="285" y1="140" x2="315" y2="170"/><circle r="15" cx="285" cy="140"/><text x="285" y="145">5</text><rect width="16" height="16" x="247" y="162"/><rect width="16" height="16" x="307" y="162"/><rect width="16" height="16" x="367" y="132"/></svg><br>


