# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 1

Due: In Class, Thursday 17 September 2015

1. Arrange the following functions in order of non-decreasing growth rate; i.e., $f_i$ may precede $f_j$ only if $f_i=O(f_j)$

	- $f_1(n)=n^{2}$
	- $f_2(n)=\sqrt{2n}$
	- $f_3(n)=n+10$
	- $f_4(n)=2^n$
	- $f_5(n)=100^n$
	- $f_6(n)=8n\log n$ 
	- $f_7(n)=n^{\log\log n}$ 
	- $f_8(n)=\log\log n$
	- $f_9(n)=2^{\log n}$
	- $f_{10}(n)=2^{10}$

2. For each of the following, prove if you think it is true or give a counterexample if you think it is false.

	- $2^{n+1}=O(2^n)$ 
	- $2^{2n}=O(2^n)$ 

3. Suppose functions $f(n)>0$ and $g(n)>0$ satisfy $f(n) = O(g(n))$. For each of the following, prove if you think it is true or give a counterexample if you think it is false.

	- $(f(n))^2=O((g(n))^2)$
	- $2^{f(n)}=O(2^{g(n)})$
 
4. Show that for any real constant $a$, $(n+a)^5=\Theta(n^5)$.

5. Given an array $A$ storing $n$ integers and another integer $s$, find whether or not there exist two elements $x$ and $y$ in the array such that $x+y=s$. Assuming it is possible to sort $n$ numbers in $O(n\log n)$ time, describe an $O(n \log n)$ time algorithm to solve the problem.
