# CSC 3102 --- Advanced Data Structures & Algorithm Analysis

## Homework 1

Due: In class, on paper, Tuesday 20 September 2016. Typed submissions receive extra credit.

1. (5 points) The number of operations executed by algorithms A and B is $40 n^2$ and $2 n^3$, respectively. Determine $n_0$ such that A is better than B for $n > n_0$.

1. (5 points) Show that $(n + 1)^5$ is $O(n^5)$.

1. (5 points) Show that $n^2$ is $\Omega(n\log n)$.

1. (10 points) Show that if $d(n)$ is $O(e(n))$ and $f(n)$ is $O(g(n))$, then $d(n) + f(n)$ is $O(e(n) + g(n))$.

1. (10 points) For each of the following, either prove the statement true or give a counterexample $n$ if false.

	- $2^{n+1}$ is $O(2^n)$
	- $2^{2n}$ is $O(2^n)$
	- $(f(n))^2$ is $O((g(n))^2)$
	- $2^{f(n)}$ is $O(2^{g(n)})$

1. (10 points) Determine the Big-$O$ bound of the following code, given input size $n$.

	&emsp; for ($i\gets 1$; $i\leq n$; $i\gets 2\ i$)  
	&emsp;&emsp; for ($j\gets 1$; $j\leq i$; $j\gets j + 1$)  
	&emsp;&emsp;&emsp; print $A[j]$  

1. (10 points) Arrange the following functions in non-decreasing order. Specifically, if $i\lt j$ then $f_i$ is $O(f_j)$. There's no need to show proof of the ordering.

	- $f_1(n)=n^{1/3}$
	- $f_2(n)=\sqrt{2n}$
	- $f_3(n)=n+10$
	- $f_4(n)=2^n$
	- $f_5(n)=100^n$
	- $f_6(n)=\log^3 n$
	- $f_7(n)=3n\log n$ 
	- $f_8(n)=n^{\log\log n}$ 
	- $f_9(n)=\log\sqrt n$
	- $f_{10}(n)=\log\log n$
	- $f_{11}(n)=3 n^4 + 6 n^3$
	- $f_{12}(n)=2^{\log n}$
	- $f_{13}(n)=2^{10}$

