# Sorting

Reading: Chapter 11 of Goodrich et al.

# Merge-sort

To merge-sort a sequence of items: cut the unsorted sequence in half, recursively sort each half, and merge the two sorted halves into a sorted sequence. The base case is a sequence of zero or one items, which is by definitien sorted.

Analyze the running order of merge-sort by expanding the recurrence relation:

$$t(n)=\begin{cases} b & n\le 1 \\ 2\,t(n\,/\,2)+c\,n & \text{otherwise}\end{cases}$$

# Quick-sort

To quick-sort a sequence of items: pick an item $x$ from the unsorted sequence. Copy all items less than $x$ to a sequence $L$, all items equal to $x$ to a sequence $E$, and all items greater than $x$ to a sequence $G$. Recursively sort $L$ and $G$, then concatenate the sorted $L$, $E$, and $G$, giving a sorted sequence. The base case is a sequence of zero or one items.

What's the worst case behavior?

Pivot choice: First, Last, Middle, Median, Median-of-Three, Random.

Analyze the best-case running order quick-sort by noting the steps required at each level of recursion:

$$\begin{align}
s(0)&=n\\
s(1)&=n-1\\
s(2)&=n-1-2\\
s(3)&=n-1-2-4\\
s(i)&=n-(2^i-1)
\end{align}$$

This can only proceed until $2^i-1=n$ or $i=\log_2(n+1)$. Each level does $O(n)$ steps, so the total is $O(n\log n)$.

The quick-sort has a straightforward in-place implementation that makes it especially useful in practice.

The quick-sort also has a straightforward adaptation to the selection problem (find the $k$-th smallest element in a sequence) that is $O(n)$ in the expected case. This is known as quick-select.
