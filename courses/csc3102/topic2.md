# Analysis Tools

Reading: Chapter 4 of Goodrich et al.

## The "Seven" Functions

An algorithm is always measured by the number of steps that it takes to execute on an input of size $n$. This isolates the quality of the algorithm from the speed of the computer or the skill of the programmer.

- $f(n)=c$

	"Constant" where $c$ is usually taken to be 1.

- $f(n)=\log n$

	"Logarithmic" where it turns out the base does not matter, though it is often taken to be 2. Useful logarithmic identities:

	- $y=\log_b x \iff x=b^y$
	- $\log_b a c = \log_b a + \log_b c$
	- $\log_b \frac{a}{c} = \log_b a - \log_b c$
	- $\log_b a^c = c \log_b a$
	- $\log_b a = \frac{\log_d a}{\log_d b}$
	- $b^{\log_d a} = a^{\log_d b}$

	Also note, $\log^c n = (\log n)^c$, and see Example 4.2 for some tricky identities.

- $f(n)=n$

	"Linear," where we touch every element of a collection.

- $f(n)=n\log n$

	"N-Log-N," which has no spiffy name, is a bit slower than linear, but *much* faster than quadratic.

- $f(n)=n^2$

	"Quadratic," which arises due to nested loops. Don't forget:

	$$\sum_{i=1}^n i=\frac{n (n+1)}{2}$$

- $f(n)=n^3$

	"Cubic," though this category generally includes all "polynomial" functions $n^d$ of order greater than 2.

- $f(n)=b^n$

	"Exponential," where the base $b$ *does* matter.

	- $(b^a)^c = b^{ac}$
	- $b^a b^c = b^{a+c}$
	- $\frac{b^a}{b^c} = b^{a-c}$
	- $b^\frac{a}{c}=\sqrt[c]{b^a}$
	- $\displaystyle{\sum_{i=0}^{n-1} r^i = \frac{1-r^n}{1-r}}$

One of the universal truisms of computer science is that polynomials are "good" and exponentials are "bad."

## The "Big-O" Notation

Asymptotic notation

- $f(n)$ is $O(g(n))$ if there is a real value $c>0$ and an integer $n_0\ge 1$ such that $f(n)\le c g(n)$ for $n\ge n_0$.

- $f(n)$ is $\Omega(g(n))$ if there is a real value $c>0$ and an integer $n_0\ge 1$ such that $f(n)\ge c g(n)$ for $n\ge n_0$.

- $f(n)$ is $\Theta(g(n))$ if there are real values $c_1>0$ and $c_2>0$ and an integer $n_0\ge 1$ such that $c_1 g(n)\le f(n)\le c_2 g(n)$ for $n\ge n_0$.

Examples:

1. We can justify that the function $8n - 2$ is $O(n)$ by finding $c$ and $n_0$ such that the definition of $O(n)$ holds.

1. Note that $5n^4 + 3n^3 + 2n^2 + 4n + 1$ is $O(n^4)$ because
$$5n^4 + 3n^3 + 2n^2 + 4n + 1 \le (5 + 3 + 2 + 4 + 1) n^4 =c n^4$$
for $c=15$, when $n\ge n_0 = 1$. This correctly indicates that the degree of the polynomial gives the growth of the function, and that we can ignore terms of lesser degree.

1. $3\log n + 2$ is $O(\log n)$ because $3\log n + 2 \le 5\log n$ for $n \ge 2$.

1. This example is fairly sophisticated: $(n + a)^5$ is $\Theta(n^5)$ for any real value $a$.

Note, if $d(n)$ is $O(e(n))$ and $f(n)$ is $O(g(n))$ then

- $d(n)+f(n)$ is $O(e(n)+g(n))$
- $d(n)\,f(n)$ is $O(e(n)\,g(n))$

Algorithm analysis

- A simple loop $i$ from $1$ to $n$.

- A simple nested loop $i$ from $1$ to $n$ within $j$ from $1$ to $n$.

- A nested loop $i$ from $1$ to $n$ within $j$ from $1$ to $i$.

- Here's a simple $O(n\log n)$ example:

	&emsp; for ($i\gets 1$; $i\leq n$; $i\gets i + 1$)  
	&emsp;&emsp; for ($j\gets 1$; $j\leq n$; $j\gets 2\ j$)  
	&emsp;&emsp;&emsp; print $j$  

- Here's a deceiving example:

	&emsp; $s\gets 1$  
	&emsp; for ($i\gets 1$; $i\leq n$; $i\gets i + 1$)  
	&emsp;&emsp; for ($j\gets 1$; $j\leq n$; $j\gets j + s$)  
	&emsp;&emsp;&emsp; print $j$  
	&emsp;&emsp; $s\gets 2\,s$

- This example calculates $y=x^n$

	&emsp; $y\gets 1$  
	&emsp; for ($i\gets 1$; $i\leq n$; $i\gets i + 1$)  
	&emsp;&emsp; $y\gets y * x$

- So does this one:

	$$p(x,n) = \begin{cases} 1 & \text{if}\ n = 0 \\ x\cdot p(x, n-1) & \text{otherwise}\end{cases}$$

- And this one:

	$$p(x,n) = \begin{cases} 1 & \text{if}\ n = 0 \\ p(x, n/2)^2 & \text{if}\ n > 0\ \text{is even} \\ x\cdot p(x, (n-1)/2)^2 & \text{if}\ n > 0\ \text{is odd} \\ \end{cases}$$

Now we make a leap forward in the textbook to analyze a few algorithms familiar from Intro:

# Selection sort

&emsp; for ($j\gets 1$; $j\leq n - 1$; $j\gets j + 1$)  
&emsp;&emsp; $m\gets j$  
&emsp;&emsp; for ($i\gets j + 1$; $i\leq n$; $i\gets i + 1$)  
&emsp;&emsp;&emsp; if ($A[i] < A[m]$)  
&emsp;&emsp;&emsp;&emsp; $m\gets i$  
&emsp;&emsp; if ($m\neq j$)  
&emsp;&emsp;&emsp; swap($A[j]$, $A[m]$)  

## Merge-sort

To merge-sort a sequence of items: cut the unsorted sequence in half, recursively sort each half, and merge the two sorted halves into a sorted sequence. The base case is a sequence of zero or one items, which is by definition sorted.

Analyze the running order of merge-sort by expanding the recurrence relation:

$$f(n)=\begin{cases} b & n\le 1 \\ 2\,f(n\,/\,2)+c\,n & \text{otherwise}\end{cases}$$

## Quick-sort

To quick-sort a sequence of items: pick an item $x$ from the unsorted sequence. Copy all items less than $x$ to a sequence $L$, all items equal to $x$ to a sequence $E$, and all items greater than $x$ to a sequence $G$. Recursively sort $L$ and $G$, then concatenate the sorted $L$, $E$, and $G$, giving a sorted sequence. The base case is a sequence of zero or one items.

Analyze the best-case running order quick-sort by noting the steps required at each level of recursion:

$$\begin{align}
s(0)&=n\\
s(1)&=n-1\\
s(2)&=n-1-2\\
s(3)&=n-1-2-4\\
s(i)&=n-(2^i-1)
\end{align}$$

This can only proceed until $2^i-1=n$ or $i=\log_2(n+1)$, and $$\sum_{i=0}^{\log_2(n+1)} n-2^i+1 \mathrm{\ is\ } O(n\log n)$$.
