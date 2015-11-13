# Search Trees

Reading: Chapter 10 of Goodrich et al.

# Binary Search Trees

Each internal node $v$ contains a key $k$ such that

- Keys stored in the left subtree of $v$ are less than or equal to $k$.
- Keys stored in the right subtree of $v$ are greater than or equal to $k$.

By the convention of the textbook, nodes include a parent pointer, and only internal nodes contain keys. The existence of empty external nodes ensures that every binary search tree is *proper* and simplifies some operations (arguably).

An in-order traversal produces a list of keys in non-decreasing order.

We can confirm that a given binary tree is a binary search tree as follows:

&emsp; isBST($v$, $min$, $max$)  
&emsp;&emsp; if $v$ is external  
&emsp;&emsp;&emsp; return true  
&emsp;&emsp; if $v$.key < $min$ or $v$.key > $max$  
&emsp;&emsp;&emsp; return false  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; return isBST($v$.left, $min$, $v$.key) and isBST($v$.right, $v$.key, $max$)  

Calling this function like so: isBST($v$, $-\infty$, $+\infty$)

# Textbook BST implementation

This search function returns either the internal node containing the given key $k$ (if found) or the external node where $k$ should have appeared (if not found).

&emsp; search($v$, $k$)  
&emsp;&emsp; if $v$ is external  
&emsp;&emsp;&emsp; return $v$  
&emsp;&emsp; if $k$ < $v$.key  
&emsp;&emsp;&emsp; return search($v$.left, $k$)  
&emsp;&emsp; if $k$ > $v$.key  
&emsp;&emsp;&emsp; return search($v$.right, $k$)  
&emsp;&emsp; return $v$  

Binary search is $O(h)$ in the height $h$. We expect $h$ to be $O(\log n)$ on average.

This insertion function takes advantage of the search function. It has two cases: insertion of a duplicate key and insertion of a unique key.

&emsp; insert($v$, $k$)  
&emsp;&emsp; $w\gets$ search($v$, $k$)  
&emsp;&emsp; if $w$ is internal  
&emsp;&emsp;&emsp; return insert($w$.left, $k$)  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; $w$.key $\gets k$  
&emsp;&emsp;&emsp; $w$.left $\gets$ new node($w$, $\emptyset$, $\emptyset$)  
&emsp;&emsp;&emsp; $w$.right $\gets$ new node($w$, $\emptyset$, $\emptyset$)  
&emsp;&emsp;&emsp; return $w$  

Note that the minimum value is always found at the left-most internal node. Thus determining the front of a binary-search-tree-based priority queue is $O(\log n)$.

Removal has multiple cases in two classes: removal of a node with two children and removal of a node with zero or one child.

&emsp; remove($v$, $k$)  
&emsp;&emsp; $w\gets$ search($v$, $k$)  
&emsp;&emsp; if $w$ is external  
&emsp;&emsp;&emsp; throw an error  
&emsp;&emsp; else if $w$.left is internal and $w$.right is internal   
&emsp;&emsp;&emsp; $y\gets$ findMin($w$.right)  
&emsp;&emsp;&emsp; $w$.key $\gets y$.key  
&emsp;&emsp;&emsp; replace($y$, $y$.right)  
&emsp;&emsp; else if $w$.left is internal  
&emsp;&emsp;&emsp; replace($w$, $w$.left)  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; replace($w$, $w$.right)  

The replace function swaps node $w$ into the tree in place of $v$.

&emsp; replace($v$, $w$)  
&emsp;&emsp; if $v$.parent.left = $v$  
&emsp;&emsp;&emsp; $v$.parent.left $\gets w$  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; $v$.parent.right $\gets w$  
&emsp;&emsp;$w$.parent $\gets v$.parent  

The findMin function finds the smallest key in a given subtree.

&emsp; findMin($v$)  
&emsp;&emsp; if $v$.left is internal  
&emsp;&emsp;&emsp; return findMin($v$.left)  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; return $v$

<div style="page-break-after:always"></div>

# Alternative BST implementation

Here is an alternative formulation in the functional style. It rebuilds nodes along the $O(\log n)$ path from leaf to root, but requires neither parent pointers nor explicitly-represented external nodes.

&emsp; insert($v$, $k$)  
&emsp;&emsp; if $v$  
&emsp;&emsp;&emsp; if $k$ > $v$.key  
&emsp;&emsp;&emsp;&emsp; return new node($v$.key, $v$.left, insert($v$.right, $k$))  
&emsp;&emsp;&emsp; else  
&emsp;&emsp;&emsp;&emsp; return new node($v$.key, insert($v$.left, $k$), $v$.right)  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; return new node(k, $\emptyset$, $\emptyset$)

&emsp; remove($v$, $k$)  
&emsp;&emsp; if $v$  
&emsp;&emsp;&emsp; if $k$ < $v$.key  
&emsp;&emsp;&emsp;&emsp; return new node($v$.key, remove($v$.left, $k$), $v$.right)  
&emsp;&emsp;&emsp; if $k$ > $v$.key  
&emsp;&emsp;&emsp;&emsp; return new node($v$.key, $v$.left, remove($v$.right, $k$))  

&emsp;&emsp;&emsp; if $v$.left and $v$.right)   
&emsp;&emsp;&emsp;&emsp; $y \gets$ findMin($v$.right)  
&emsp;&emsp;&emsp;&emsp; return new node(y.key, $v$.left, remove($v$.right, $y$.key))  

&emsp;&emsp;&emsp; if $v$.left  
&emsp;&emsp;&emsp;&emsp; return $v$.left  
&emsp;&emsp;&emsp; else  
&emsp;&emsp;&emsp;&emsp; return $v$.right  
&emsp;&emsp; return $\emptyset$


# AVL Tree

An a AVL tree is a binary tree where each node stores its own *height* (the length of the longest path from that node to an external node).

An AVL tree has the *height-balance property*: for every internal node $v$, the heights of the children of $v$ differ by at most 1.

The height of an AVL tree with $n$ entries is $O(\log n)$. This is straightforward to prove using the following definition giving the minimum number of nodes in a tree of height $h$.

$$n(h) = \begin{cases} 1 & h = 1 \\ 2 & h = 2 \\ 1 + n(h-1) + n(h - 2) & \text{otherwise} \\ \end{cases}$$

# Splay tree

A splay tree is an ordinary binary search tree with a "splay" operation that rotates a value to the root.

Search for $k$: Search for $k$ normally. If found, splay on the value $k$.

Split at $k$: splay on the value $k$. The resulting tree will have all $x\le k$ in the left subtree and all $x\gt k$ in the right.

Join $S$ and $T$ where $s\le t$ for all $s$ in $S$ and $t$ in $T$. Splay on the maximum value in $S$. The resulting tree will have no right subtree at the root. Place $T$ there.

Insert: Insert $k$ normally, then splay on the value $k$.

Delete: Splay the value $k$. If $k$ is at the root, join the two subtrees.
