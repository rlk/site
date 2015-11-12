# Search Trees

Reading: Chapter 10 of Goodrich et al.

# Binary Search Trees

Each internal node $v$ contains a key $k$ such that

- Keys stored in the left subtree of $v$ are less than or equal to $k$.
- Keys stored in the right subtree of $v$ are greater than or equal to $k$.

By the convention of the book, nodes include a parent pointer, and only internal nodes contain keys. The existence of empty external nodes ensures that every binary search tree is *proper* and simplifies some operations (arguably).

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

# AVL Tree

An a AVL tree is a binary tree where each node stores its own *height* (the length of the longest path from that node to an external node).

An AVL tree has the *height-balance property*: for every internal node $v$, the heights of the children of $v$ differ by at most 1.

The height of an AVL tree with $n$ entries is $O(\log n)$.

Given this example:

<svg width="510" height="150"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="165" y1="20" x2="45" y2="50"/><line x1="165" y1="20" x2="405" y2="50"/><circle r="15" cx="165" cy="20"/><text x="165" y="25">44</text><line x1="45" y1="50" x2="15" y2="80"/><line x1="45" y1="50" x2="105" y2="80"/><circle r="15" cx="45" cy="50"/><text x="45" y="55">17</text><rect width="16" height="16" x="7" y="72"/><line x1="105" y1="80" x2="75" y2="110"/><line x1="105" y1="80" x2="135" y2="110"/><circle r="15" cx="105" cy="80"/><text x="105" y="85">32</text><rect width="16" height="16" x="67" y="102"/><rect width="16" height="16" x="127" y="102"/><line x1="405" y1="50" x2="285" y2="80"/><line x1="405" y1="50" x2="465" y2="80"/><circle r="15" cx="405" cy="50"/><text x="405" y="55">78</text><line x1="285" y1="80" x2="225" y2="110"/><line x1="285" y1="80" x2="345" y2="110"/><circle r="15" cx="285" cy="80"/><text x="285" y="85">50</text><line x1="225" y1="110" x2="195" y2="140"/><line x1="225" y1="110" x2="255" y2="140"/><circle r="15" cx="225" cy="110"/><text x="225" y="115">48</text><rect width="16" height="16" x="187" y="132"/><rect width="16" height="16" x="247" y="132"/><line x1="345" y1="110" x2="315" y2="140"/><line x1="345" y1="110" x2="375" y2="140"/><circle r="15" cx="345" cy="110"/><text x="345" y="115">62</text><rect width="16" height="16" x="307" y="132"/><rect width="16" height="16" x="367" y="132"/><line x1="465" y1="80" x2="435" y2="110"/><line x1="465" y1="80" x2="495" y2="110"/><circle r="15" cx="465" cy="80"/><text x="465" y="85">88</text><rect width="16" height="16" x="427" y="102"/><rect width="16" height="16" x="487" y="102"/></svg>

Insert 54 as into a simple binary tree:

<svg width="570" height="180"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="165" y1="20" x2="45" y2="50"/><line x1="165" y1="20" x2="465" y2="50"/><circle r="15" cx="165" cy="20"/><text x="165" y="25">44</text><line x1="45" y1="50" x2="15" y2="80"/><line x1="45" y1="50" x2="105" y2="80"/><circle r="15" cx="45" cy="50"/><text x="45" y="55">17</text><rect width="16" height="16" x="7" y="72"/><line x1="105" y1="80" x2="75" y2="110"/><line x1="105" y1="80" x2="135" y2="110"/><circle r="15" cx="105" cy="80"/><text x="105" y="85">32</text><rect width="16" height="16" x="67" y="102"/><rect width="16" height="16" x="127" y="102"/><line x1="465" y1="50" x2="285" y2="80"/><line x1="465" y1="50" x2="525" y2="80"/><circle r="15" cx="465" cy="50"/><text x="465" y="55">78</text><line x1="285" y1="80" x2="225" y2="110"/><line x1="285" y1="80" x2="405" y2="110"/><circle r="15" cx="285" cy="80"/><text x="285" y="85">50</text><line x1="225" y1="110" x2="195" y2="140"/><line x1="225" y1="110" x2="255" y2="140"/><circle r="15" cx="225" cy="110"/><text x="225" y="115">48</text><rect width="16" height="16" x="187" y="132"/><rect width="16" height="16" x="247" y="132"/><line x1="405" y1="110" x2="345" y2="140"/><line x1="405" y1="110" x2="435" y2="140"/><circle r="15" cx="405" cy="110"/><text x="405" y="115">62</text><line x1="345" y1="140" x2="315" y2="170"/><line x1="345" y1="140" x2="375" y2="170"/><circle r="15" cx="345" cy="140"/><text x="345" y="145">54</text><rect width="16" height="16" x="307" y="162"/><rect width="16" height="16" x="367" y="162"/><rect width="16" height="16" x="427" y="132"/><line x1="525" y1="80" x2="495" y2="110"/><line x1="525" y1="80" x2="555" y2="110"/><circle r="15" cx="525" cy="80"/><text x="525" y="85">88</text><rect width="16" height="16" x="487" y="102"/><rect width="16" height="16" x="547" y="102"/></svg>

Restructure to satisfy the height-balance property. This involves the reordering of the first node found to be unbalanced $z$, it's highest child $y$, and it's highest grandchild $x$. There are four cases to manage, where $y$ is either the left or right child of $z$, and $x$ is either the left or right child of $y$.

<svg width="570" height="150"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="165" y1="20" x2="45" y2="50"/><line x1="165" y1="20" x2="405" y2="50"/><circle r="15" cx="165" cy="20"/><text x="165" y="25">44</text><line x1="45" y1="50" x2="15" y2="80"/><line x1="45" y1="50" x2="105" y2="80"/><circle r="15" cx="45" cy="50"/><text x="45" y="55">17</text><rect width="16" height="16" x="7" y="72"/><line x1="105" y1="80" x2="75" y2="110"/><line x1="105" y1="80" x2="135" y2="110"/><circle r="15" cx="105" cy="80"/><text x="105" y="85">32</text><rect width="16" height="16" x="67" y="102"/><rect width="16" height="16" x="127" y="102"/><line x1="405" y1="50" x2="285" y2="80"/><line x1="405" y1="50" x2="465" y2="80"/><circle r="15" cx="405" cy="50"/><text x="405" y="55">62</text><line x1="285" y1="80" x2="225" y2="110"/><line x1="285" y1="80" x2="345" y2="110"/><circle r="15" cx="285" cy="80"/><text x="285" y="85">50</text><line x1="225" y1="110" x2="195" y2="140"/><line x1="225" y1="110" x2="255" y2="140"/><circle r="15" cx="225" cy="110"/><text x="225" y="115">48</text><rect width="16" height="16" x="187" y="132"/><rect width="16" height="16" x="247" y="132"/><line x1="345" y1="110" x2="315" y2="140"/><line x1="345" y1="110" x2="375" y2="140"/><circle r="15" cx="345" cy="110"/><text x="345" y="115">54</text><rect width="16" height="16" x="307" y="132"/><rect width="16" height="16" x="367" y="132"/><line x1="465" y1="80" x2="435" y2="110"/><line x1="465" y1="80" x2="525" y2="110"/><circle r="15" cx="465" cy="80"/><text x="465" y="85">78</text><rect width="16" height="16" x="427" y="102"/><line x1="525" y1="110" x2="495" y2="140"/><line x1="525" y1="110" x2="555" y2="140"/><circle r="15" cx="525" cy="110"/><text x="525" y="115">88</text><rect width="16" height="16" x="487" y="132"/><rect width="16" height="16" x="547" y="132"/></svg>

Remove 32 as from a simple binary tree:

<svg width="510" height="150"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="105" y1="20" x2="45" y2="50"/><line x1="105" y1="20" x2="345" y2="50"/><circle r="15" cx="105" cy="20"/><text x="105" y="25">44</text><line x1="45" y1="50" x2="15" y2="80"/><line x1="45" y1="50" x2="75" y2="80"/><circle r="15" cx="45" cy="50"/><text x="45" y="55">17</text><rect width="16" height="16" x="7" y="72"/><rect width="16" height="16" x="67" y="72"/><line x1="345" y1="50" x2="225" y2="80"/><line x1="345" y1="50" x2="405" y2="80"/><circle r="15" cx="345" cy="50"/><text x="345" y="55">62</text><line x1="225" y1="80" x2="165" y2="110"/><line x1="225" y1="80" x2="285" y2="110"/><circle r="15" cx="225" cy="80"/><text x="225" y="85">50</text><line x1="165" y1="110" x2="135" y2="140"/><line x1="165" y1="110" x2="195" y2="140"/><circle r="15" cx="165" cy="110"/><text x="165" y="115">48</text><rect width="16" height="16" x="127" y="132"/><rect width="16" height="16" x="187" y="132"/><line x1="285" y1="110" x2="255" y2="140"/><line x1="285" y1="110" x2="315" y2="140"/><circle r="15" cx="285" cy="110"/><text x="285" y="115">54</text><rect width="16" height="16" x="247" y="132"/><rect width="16" height="16" x="307" y="132"/><line x1="405" y1="80" x2="375" y2="110"/><line x1="405" y1="80" x2="465" y2="110"/><circle r="15" cx="405" cy="80"/><text x="405" y="85">78</text><rect width="16" height="16" x="367" y="102"/><line x1="465" y1="110" x2="435" y2="140"/><line x1="465" y1="110" x2="495" y2="140"/><circle r="15" cx="465" cy="110"/><text x="465" y="115">88</text><rect width="16" height="16" x="427" y="132"/><rect width="16" height="16" x="487" y="132"/></svg>

Restructure again to satisfy the height-balance property:

<svg width="510" height="150"><style>line, rect, circle { fill: white; stroke: black } text { text-anchor: middle }</style><line x1="345" y1="20" x2="105" y2="50"/><line x1="345" y1="20" x2="405" y2="50"/><circle r="15" cx="345" cy="20"/><text x="345" y="25">62</text><line x1="105" y1="50" x2="45" y2="80"/><line x1="105" y1="50" x2="225" y2="80"/><circle r="15" cx="105" cy="50"/><text x="105" y="55">44</text><line x1="45" y1="80" x2="15" y2="110"/><line x1="45" y1="80" x2="75" y2="110"/><circle r="15" cx="45" cy="80"/><text x="45" y="85">17</text><rect width="16" height="16" x="7" y="102"/><rect width="16" height="16" x="67" y="102"/><line x1="225" y1="80" x2="165" y2="110"/><line x1="225" y1="80" x2="285" y2="110"/><circle r="15" cx="225" cy="80"/><text x="225" y="85">50</text><line x1="165" y1="110" x2="135" y2="140"/><line x1="165" y1="110" x2="195" y2="140"/><circle r="15" cx="165" cy="110"/><text x="165" y="115">48</text><rect width="16" height="16" x="127" y="132"/><rect width="16" height="16" x="187" y="132"/><line x1="285" y1="110" x2="255" y2="140"/><line x1="285" y1="110" x2="315" y2="140"/><circle r="15" cx="285" cy="110"/><text x="285" y="115">54</text><rect width="16" height="16" x="247" y="132"/><rect width="16" height="16" x="307" y="132"/><line x1="405" y1="50" x2="375" y2="80"/><line x1="405" y1="50" x2="465" y2="80"/><circle r="15" cx="405" cy="50"/><text x="405" y="55">78</text><rect width="16" height="16" x="367" y="72"/><line x1="465" y1="80" x2="435" y2="110"/><line x1="465" y1="80" x2="495" y2="110"/><circle r="15" cx="465" cy="80"/><text x="465" y="85">88</text><rect width="16" height="16" x="427" y="102"/><rect width="16" height="16" x="487" y="102"/></svg>

# Splay tree

A splay tree is an ordinary binary search tree with a "splay" operation that rotates a value to the root.

Search for $k$: Search for $k$ normally. If found, splay on the value $k$.

Split at $k$: splay on the value $k$. The resulting tree will have all $x\le k$ in the left subtree and all $x\gt k$ in the right.

Join $S$ and $T$ where $s\le t$ for all $s$ in $S$ and $t$ in $T$. Splay on the maximum value in $S$. The resulting tree will have no right subtree at the root. Place $T$ there.

Insert: Insert $k$ normally, then splay on the value $k$.

Delete: Splay the value $k$. If $k$ is at the root, join the two subtrees.
