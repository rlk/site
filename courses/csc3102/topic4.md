# Trees

- C++ Reading: Chapter 7 Trees
- Java Reading: Chapter 8 Trees

A tree is a set of *nodes* in a *parent-child* relationship.

## Tree Terminology

- Each node has a unique *parent*.
- Excepting the *root* has no parent.
- A node $v$ with parent $u$ is a *child* of $u$.
- Two nodes with the same parent are *siblings*.
- A node is *internal* if it has one or more children.
- An *external* node is also called a *leaf*.
- A node $u$ is an *ancestor* of $v$ if $u = v$ or $u$ is the ancestor of the parent of $v$.
- A node $u$ is a *descendant* of $v$ if $v$ is an ancestor of $u$.
- A *subtree* at node $v$ is the tree consisting of all descendants of $v$.
- "Descendant" is a noun. "Descendent" is an adjective.
- An *edge* is a pair of nodes $u$ and $v$ such that $u$ is parent of $v$ or vice-versa.
- A *path* is a sequence of nodes such that any consecutive pair of nodes form an edge.
- The *depth* of $v$ is the number of ancestors of $v$, not counting $v$ itself.
- The *height* of $v$ is the distance from $v$ to its deepest descendant.
- The *height* of a tree is the depth of its deepest external node.
- The *level* $d$ is the set of all nodes at depth $d$.
- In a *binary* tree, each node has at most two children.
- A binary tree is *proper* if each node has zero or two children.

## General Tree Representation

A general linked tree structure defines each node with a value, a reference to a parent, and a sequence of references to children.

		node parent(node v)
		sequence& children(node v)

		bool isRoot(node v)
		bool isExternal(node v)

Trees are naturally recursive. 

We can also recursively *traverse* a tree, visiting each node in either *pre-order*, *in-order*, or *post-order*. We can also traverse in *depth-first* order using a stack, or *breadth-first* order using a queue.

## Binary Trees

A binary tree is simplified because it does away with the child sequence.

		class node
		{
			T value
			node left
			node right
		}

It's trivially easy to define

		bool isRoot(node v)
		bool isExternal(node v)

A note about the textbook's definition of tree structures: it is very specific in its use of iterators. For example, Code Fragment 7.24 in the C++ book (similar to C.F. 8.22 in the Java). This obsession with iterators is not necessary. A more pure implementation of a pre-order traversal would look more like this:

&emsp; function binaryPreorder(v)  
&emsp;&emsp; visit(v)  
&emsp;&emsp; if v.left exists  
&emsp;&emsp;&emsp; binaryPreorder(v.left)  
&emsp;&emsp; if v.right exists  
&emsp;&emsp;&emsp; binaryPreorder(v.right)  

An in-order:

&emsp; function binaryInorder(v)  
&emsp;&emsp; if v.left exists  
&emsp;&emsp;&emsp; binaryInorder(v.left)  
&emsp;&emsp; visit(v)  
&emsp;&emsp; if v.right exists  
&emsp;&emsp;&emsp; binaryInorder(v.right)  

A post-order:

&emsp; function binaryPostorder(v)  
&emsp;&emsp; if v.left exists  
&emsp;&emsp;&emsp; binaryPostorder(v.left)  
&emsp;&emsp; if v.right exists  
&emsp;&emsp;&emsp; binaryPostorder(v.right)  
&emsp;&emsp; visit(v)  

Here's an alternative formulation of a pre-order traversal, showing the stack usage explicitly.

&emsp; $S$.push($v$)  
&emsp; while $S$ is not empty  
&emsp;&emsp; $v$ = $S$.top()  
&emsp;&emsp; visit($v$)  
&emsp;&emsp; $S$.pop()  
&emsp;&emsp; if $v$.right exists  
&emsp;&emsp;&emsp;&emsp; $S$.push($v$.right)  
&emsp;&emsp; if $v$.left exists  
&emsp;&emsp;&emsp;&emsp; $S$.push($v$.left)  

Here's the same pre-order traversal, but with a queue instead of a stack. Note that breadth-first traversal emerges naturally.

&emsp; $Q$.enqueue($v$)  
&emsp; while $Q$ is not empty  
&emsp;&emsp; $v$ = $Q$.front()  
&emsp;&emsp; visit($v$)  
&emsp;&emsp; $Q$.dequeue()  
&emsp;&emsp; if $v$.right exists  
&emsp;&emsp;&emsp;&emsp; $Q$.enqueue($v$.right)  
&emsp;&emsp; if $v$.left exists  
&emsp;&emsp;&emsp;&emsp; $Q$.enqueue($v$.left)  

We can easily define recursive algorithms to give the depth and height of a node. The height of a proper binary tree:

&emsp; function computeHeight(node $v$)  
&emsp;&emsp; if $v$.isExternal()  
&emsp;&emsp;&emsp; return 0  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; return 1 + max(computeHeight($v$.left), computeHeight($v$.right)  

The height of an improper binary tree:

&emsp; function computeHeight(node $v$)  
&emsp;&emsp; if $v$.left and $v$.right  
&emsp;&emsp;&emsp; return 1 + max(computeHeight($v$.left), computeHeight($v$.right)  
&emsp;&emsp; else if $v$.left  
&emsp;&emsp;&emsp; return 1 + computeHeight($v$.left)  
&emsp;&emsp; else if $v$.right  
&emsp;&emsp;&emsp; return 1 + computeHeight($v$.right)  
&emsp;&emsp; else  
&emsp;&emsp;&emsp; return 0  

The following properties must hold for node count $n$, height $h$, external count $n_E$, and internal count $n_I$.

- $1 \le n_E \le 2^h$
- $h \le n_I \le 2^h - 1$
- $h + 1 \le n \le 2^{h+1} - 1$
- $\log(n+1) - 1 \le h \le n - 1$

If a tree is *proper* then:

- $2h + 1 \le n \le 2^{h+1} - 1$
- $h + 1 \le n_e \le 2^h$
- $h \le n_I \le 2^h - 1$
- $\log(n+1) - 1 \le h \le (n - 1) / 2$
- If non-empty, $n_E = n_I + 1$

The maximum number of nodes at level $l$ is $2^l$.

Note, it's straightforward to define a general tree in terms of a binary tree.

## Binary Search Trees

Invariant: All of the values in the left subtree of a node $v$ are less than or equal to the value at $v$, while all of the values in the right subtree of a node $v$ are greater than the value at $v$.

