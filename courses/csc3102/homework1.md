# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 1

Due: In class, on paper, Thursday 11 February 2016. Typed submissions receive extra credit.

1. (10 points) Arrange the following functions in non-decreasing order. Specifically, if $i\lt j$ then $f_i$ is $O(f_j)$. There's no need to show proof of the ordering.

	- $f_1(n)=n^{1/2}$
	- $f_2(n)=\sqrt{2n}$
	- $f_3(n)=n+1$
	- $f_4(n)=2^n$
	- $f_5(n)=100^n$
	- $f_6(n)=\log^3 n$
	- $f_7(n)=7n\log n$ 
	- $f_8(n)=n^{\log\log n}$ 
	- $f_9(n)=\log\sqrt n$
	- $f_{10}(n)=\log\log n$
	- $f_{11}(n)=6 n^4 + 9 n^3$
	- $f_{12}(n)=2^{\log n}$
	- $f_{13}(n)=2^{10}$

1. (5 points) Show that $(n + 3)^3$ is $O(n^3)$.

1. (5 points) Show that $n^2$ is $\Omega(n\log n)$.

1. (10 points) Show that if $d(n)$ is $O(e(n))$ and $f(n)$ is $O(g(n))$, then $d(n)\,f(n)$ is $O(e(n)\,g(n))$.

1. (10 points) Determine the Big-$O$ bound of the following code, given input size $n$.

	&emsp; for ($i\gets 1$; $i\leq n$; $i\gets 2\ i$)  
	&emsp;&emsp; for ($j\gets 1$; $j\leq i$; $j\gets j + 1$)  
	&emsp;&emsp;&emsp; print $A[j]$  

1. (5 points) Answer this and each of the following questions using well-structured pseudocode. A textual description of the execution of a function does *not* suffice. While your answer need not be syntactically correct C++ or Java, but it should be line-by-line translatable into executable code.

	Assume a simple array $A$, indexed beginning at $0$, containing $n$ values, with a maximum capacity of $m$ values. There are no gaps between values in the array. Write a function to *insert* a value $x$ at the beginning of the array. Preserve all existing values and leave no gaps. In the event of an error, simply throw an exception.

1. (5 points) Write a function to *remove* the first value at the beginning of array $A$. Preserve all existing values and leave no gaps.

1. (5 points) Write a function to *insert* a value $x$ at index $i$ of array $A$. Preserve all existing values and leave no gaps.

1. (5 points) Write a function to *remove* the first value at index $i$ of array $A$. Preserve all existing values and leave no gaps.

1. (5 points) Write a function to *reverse* the contents of array $A$. Do so *without* introducing any additional sequence containers.

