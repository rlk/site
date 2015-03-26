# Search Trees

Reading: Chapter 10 of Goodrich et al.

# Binary Search Trees

Each internal node $v$ contains a key $k$ such that

- Keys stored in the left subtree of $v$ are less than or equal to $k$.
- Keys stored in the right subtree of $v$ are greater than or equal to $k$.

By the convention of the book, only internal nodes contain keys. This ensures that every binary search tree is *proper* and simplifies some operations (arguably).

An in-order traversal produces a list of keys in non-decreasing order.

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

