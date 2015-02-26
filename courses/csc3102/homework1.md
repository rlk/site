# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 1

Due: In Class, Thursday 5 February 2015

1. (5 points) The number of operations executed by algorithms A and B is $8 n \log n$ and $2 n^2$, respectively. Determine $n_0$ such that A is better than B for $n \ge n_0$.

1. (5 points) The number of operations executed by algorithms A and B is $40 n^2$ and $2 n^3$, respectively. Determine $n_0$ such that A is better than B for $n \ge n_0$.

1. (5 points) What is the sum of all the even numbers from $0$ to $2n$, for any positive integer $n$?

1. (10 points) Both of the following two programs do the same thing: take an array A storing $n\ge 1$ integers, and give the sum of the prefix sums in A. Give a big-$O$ characterization, in terms of $n$, of the running time of each.

	First:

	&emsp; $s \gets 0$  
	&emsp; for $i  \gets  0$ to $n - 1$  
	&emsp;&emsp; $s \gets  s + A[0]$  
	&emsp;&emsp; for $j \gets 1$ to $i$  
	&emsp;&emsp;&emsp; $s \gets  s + A[j]$  
	&emsp; return $s$

	Second:

	&emsp; $s \gets A[0]$  
	&emsp; $t \gets s$  
	&emsp; for $i \gets 1$ to $n - 1$  
	&emsp;&emsp; $s \gets s + A[i]$  
	&emsp;&emsp; $t \gets t + s$  
	&emsp; return $t$

1. (5 points) Show that $(n + 1)^5$ is $O(n^5)$.

1. (5 points) Show that $n^2$ is $\Omega(n\log n)$.

1. (20 points) Order the following functions by their big-$O$ relationships.

	- $n^2$
	- $2^{\log n}$
	- $e^n$
	- $2^{10}$
	- $6 n \log n$
	- $\log \log n$
	- $(\log n)^{\log n}$
	- $4 n \log n + 2 n$
	- $2^n$
	- $\log^2 n$
	- $n^{\log \log n}$

1. (20 points) Assuming it is possible to sort $n$ numbers in $O(n\log n)$ time, show that it is possible to solve the three-way set disjointness problem in $O(n\log n)$ time (see Section 4.2.7).
