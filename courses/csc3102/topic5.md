# Heaps and Priority Queues

- C++ Reading: Chapter 8 Heaps and Priority Queues
- Java Reading: Chapter 9 Priority Queues

# Priority Queues

A priority queue is a queue where removal depends not upon order of insertion but upon importance.

The *key* gives an element's importance. Keys must have a comparison operation that is reflexive, antisymmetric, and transitive.

Such a queue is straightforwardly implemented using a list. There are two strategies: sorted and unsorted.

A priority queue gives a straightforward scheme for sorting: Insert all elements into the priority queue and simply read them back out.

The priority queue sorting scheme, implemented using sorted and unsorted lists, gives rise to the insertion-sort and selection-sort algorithms, respectively. Both are $O(n^2)$.

If we can improve the performance of the priority queue, we can naturally improve the performance of sorting.

# Heaps

A heap:

- Is a binary tree
- Is *complete*: Level $i$ has $2^i$ nodes and the last level fills from the left.
	- This means that the height $h=\lfloor\log_2 n\rfloor$.
- Has the *heap order property*: A node $v$ has a key greater than or equal to the key of its parent.
	- This means that the minimum key is always found at the root.
- Has an efficient insertion algorithm:
	- Place the new node in the last position.
	- While the heap order property does not hold:
		- Swap the node with its parent.
	- This is $O(\log n)$ because the height of the tree is at most $\log n$
- Has an efficient root removal algorithm:
	- Copy the node in the last position to the root.
	- While the heap order property does not hold:
		- Swap the node with the smaller of its children.
	- This is $O(\log n)$ because the height of the tree is at most $\log n$
- Has an elegant zero-based array representation:
	- Let $x(v)$ be the array index of node $v$, defined as follows:
		- If $v$ is the root then $x(v)=0$.
		- If $u$ is the left child of $v$ then $x(u)=2\,x(v)+1$.
		- If $u$ is the right child of $v$ then $x(u)=2\,x(v)+2$.
		- If $p$ is the parent of $v$ then $x(p)=\lfloor\frac{x(v)-1}{2}\rfloor$.

Applying the priority queue sorting scheme to a heap results in an $O(n\log n)$ sort.

The array representation of the heap also gives rise to an extremely efficient in-place sorting algorithm.