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
