# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 2

1. Consider the following program.

	&emsp; for ($i = 0$; $i < n\,/\,2$; $i++$)  
	&emsp;&emsp; for ($j = 0$; $j < n\,/\,2$; $j++$)  
	&emsp;&emsp;&emsp; print($j$)

	A. (5 points) Assume the print statement is $O(b)$. Write an expression $f(n)$ that gives the run time of this code in the form of summations ($\sum$).

	B. (5 points) Simplify your answer $f(n)$ from Part A as much as possible. Show your work.

	C. (5 points) Justify the Big-$O$ order of your answer $f(n)$ from Part B by finding $c$ and $n_0$ such that the definition of $O$ holds.

1. Consider the following very slightly different program.

	&emsp; for ($i = 0$; $i < n\,/\,2$; $i++$)  
	&emsp;&emsp; for ($j = 0$; $j < i\,/\,2$; $j++$)  
	&emsp;&emsp;&emsp; print($j$)

	A. (5 points) Assume the print statement is $O(b)$. Write an expression $f(n)$ that gives the run time of this code in the form of summations ($\sum$).

	B. (5 points) Simplify your answer $f(n)$ from Part A as much as possible. Show your work.

	C. (5 points) Justify the Big-$O$ order of your answer $f(n)$ from Part B by finding $c$ and $n_0$ such that the definition of $O$ holds.

1. (10 points) Simplify the following recursion to a non-recursive form. $$f(n)=\begin{cases} a & \text{if}\ n = 1\\b\,n + 3\,f(n\,/\,3) & \text{otherwise}\end{cases}$$

1. Consider the following recursive definition of the binary search. It seeks a value $x$ in array $A$ and would be invoked as search($A$, 0, $n$, $x$). Assume $A$ is indexed beginning with 0.

	&emsp; search($A$, $f$, $n$, $x$)  
	&emsp;&emsp; if ($n = 1$)  
	&emsp;&emsp;&emsp; return $f$  
	&emsp; &emsp; else  
	&emsp; &emsp; &emsp; $m = n\,/\,2$  
	&emsp; &emsp; &emsp; if ($x < A[f + m]$)  
	&emsp; &emsp; &emsp; &emsp; return search($A$, $f$, $m$, $x$)  
	&emsp; &emsp; &emsp;  else  
	&emsp; &emsp; &emsp; &emsp; return search($A$, $f + m$, $n - m$, $x$)  

	A. (5 points) Show an example execution given the input $$A = [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ]$$ and $x = 13$. Specifically, list all calls to the search function in the order in which they occur, with arguments.

	B. (5 points) Write an expression $f(n)$ that gives the run time of this code in the form of a recursion. $$f(n)=\begin{cases}\text{base case} \\ \text{recursive case}\end{cases}$$ Assume the base case is at least $O(a)$ and the recursive case is at least $O(b)$.

	C. (10 points) Simplify your answer $f(n)$ from Part B as much as possible, eliminating the recursion. Show your work.

	D. (5 points) Justify the Big-$O$ order of your answer $f(n)$ from Part C by finding $c$ and $n_0$ such that the definition of $O$ holds.

1.	(10 points) Assume a stack $S = [ 1, 2, 3, 4, 5, 6, 7, 8 ]$ (where 1 is at the top) with push and pop operations, where pop removes and returns the top value. Also assume an empty queue $Q = [\,]$ with enqueue and dequeue operations, where dequeue removes and returns the front value. Show a sequence of stack and queue operations that result in $S = [ 2, 3, 4, 1, 5, 6, 7, 8 ]$ and $Q = [\,]$ using no other variables or containers.
