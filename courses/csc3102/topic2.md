# Analysis Tools

Reading: Chapter 4 of Goodman et al.

## The "Seven" Functions

An algorithm is always measured by the number of steps that it takes to execute on an input of size \\(n\\). This isolates the quality of the algorithm from the speed of the computer or the skill of the programmer.

- \\(f(n)=c\\)

	"Constant" where \\(c\\) is usually taken to be 1.

- \\(f(n)=\log n\\)

	"Logarithmic" where it turns out the base does not matter, though it is often taken to be 2. Useful logarithmic identities:

	- \\(y=\log_b x \iff x=b^y\\)
	- \\(\log_b a c = \log_b a + \log_b c\\)
	- \\(\log_b \frac{a}{c} = \log_b a - \log_b c\\)
	- \\(\log_b a^c = c \log_b a\\)
	- \\(\log_b a = \frac{\log_d a}{\log_d b}\\)
	- \\(b^{\log_d a} = a^{\log_d b}\\)

	Also note, \\(\log^c n = (\log n)^c\\), and see Example 4.2 for some tricky identities.

- \\(f(n)=n\\)

	"Linear," where we touch every element of a collection.

- \\(f(n)=n\log n\\)

	"N-Log-N," which has no spiffy name, is a bit slower than linear, but *much* faster than quadratic.

- \\(f(n)=n^2\\)

	"Quadratic," which arises due to nested loops. Don't forget:

	\\[\sum_{i=1}^n i=\frac{n (n+1)}{2}\\]

- \\(f(n)=n^3\\)

	"Cubic," though this category generally includes all "polynomial" functions of order greater than 2.

- \\(f(n)=b^n\\)

	"Exponential," where the base \\(b\\) *does* matter.

	- \\((b^a)^c = b^{ac}\\)
	- \\(b^a b^c = b^{a+c}\\)
	- \\(\frac{b^a}{b^c} = b^{a−c}\\)
	- \\(b^\frac{a}{c}=\sqrt[c]{b^a}\\)

One of the universal truisms of computer science is that polynomials are "good" and exponentials are "bad."

## The "Big-O" Notation

The significance of growth, Table 4.3:

|            | Maximum Problem Size   |||
| Run Time   | 1 sec | 1 min  | 1 hour  |
| ---------- | ----- | ------ | ------- |
| \\(400n\\) | 2500  | 150000 | 9000000 |
| \\(2n^2\\) | 707   | 5477   | 42426   |
| \\(2^n\\)  | 19    | 25     | 31      |

The significance of growth, Table 4.4:

| Run Time   | Maximum Size with \\(256\times\\) faster CPU |
| ---------- | -------------------------------------------- |
| \\(400n\\) | \\(256m\\)
| \\(2n^2\\) | \\(16m\\)
| \\(2^n\\)  | \\(m+8\\)

Asymptotic notation

- \\(f(n)\\) is \\(O(g(n))\\) if there is a real value \\(c\\) and an integer \\(n_0\\) such that \\(f(n)\le c g(n)\\) for \\(n\ge n_0\\).

- \\(f(n)\\) is \\(\Omega(g(n))\\) if there is a real value \\(c\\) and an integer \\(n_0\\) such that \\(f(n)\ge c g(n)\\) for \\(n\ge n_0\\).

- \\(f(n)\\) is \\(\Theta(g(n))\\) if there are real values \\(c'\\) and \\(c''\\) and an integer \\(n_0\\) such that \\(c' g(n)\le f(n)\le c'' g(n)\\) for \\(n\ge n_0\\).

Examples:

1. We can justify that the function \\(8n - 2\\) is \\(O(n)\\) by finding \\(c\\) and \\(n_0\\) such that the definition of \\(O(n)\\) holds.

1. Note that \\(5n^4 + 3n^3 + 2n^2 + 4n + 1\\) is \\(O(n^4)\\) because
\\[5n^4 + 3n^3 + 2n^2 + 4n + 1 \le (5 + 3 + 2 + 4 + 1) n^4 =c n^4\\]
for \\(c=15\\), when \\(n\ge n_0 = 1\\). This correctly indicates that the degree of the polynomial gives the growth of the function, and that we can ignore terms of lesser degree.

1. \\(3\log n + 2\\) is \\(O(\log n)\\) because \\(3\log n + 2 \le 5\log n\\) for \\(n \ge 2\\).

1. \\(\frac{n^2}{1000} = \Omega(n)\\)

Note, if \\(d(n)\\) is \\(O(e(n))\\) and \\(f(n)\\) is \\(O(g(n))\\) then

- \\(d(n)+f(n)\\) is \\(O(e(n)+g(n))\\)
- \\(d(n)\,f(n)\\) is \\(O(e(n)\,g(n))\\)

Algorithm analysis

- This example calculates \\(y=x^n\\)

	&emsp; \\(y\gets 1\\)  
	&emsp; for (\\(i\gets 0\\); \\(i < n\\); \\(i\gets i + 1\\))  
	&emsp;&emsp; \\(y\gets y * x\\)

- So does this one:

	\\[p(x,n) = \begin{cases} 1 & \text{if}\ n = 0 \\ x\cdot p(x, n-1) & \text{otherwise}\end{cases}\\]

- And this one:

	\\[p(x,n) = \begin{cases} 1 & \text{if}\ n = 0 \\ p(x, n/2)^2 & \text{if}\ n > 0\ \text{is even} \\ x\cdot p(x, (n-1)/2)^2 & \text{if}\ n > 0\ \text{is odd} \\ \end{cases}\\]

- Here's a tougher \\(n\log n\\) example:

	&emsp; \\(k\gets 1\\)  
	&emsp; for (\\(i\gets 0\\); \\(i < n\\); \\(i\gets i + 1\\))  
	&emsp;&emsp; for (\\(j\gets 0\\); \\(j < n\\); \\(j\gets j + k\\))  
	&emsp;&emsp;&emsp; print \\(A[j]\\)  
	&emsp;&emsp; \\(k\gets 2\,k\\)

- And here's an even tougher one:

	&emsp; for (\\(i\gets 0\\); \\(i\le n\\); \\(i\gets i + 1\\))  
	&emsp;&emsp; for (\\(j\gets 0\\); \\(j < n\\); \\(j\gets j + i\\))  
	&emsp;&emsp;&emsp; print \\(A[j]\\)  

