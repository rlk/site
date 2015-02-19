# Trees

Reading: Chapter 7 of Goodman et al.

A tree is a set of *nodes* in a *parent-child* relationship.

## Tree Terminology

- Each node has a unique *parent*.
- Excepting the *root* has no parent.
- A node \\(v\\) with parent \\(v\\) is a *child* of \\(v\\).
- Two nodes with the same parent are *siblings*.
- A node is *internal* if it has one or more children.
- An *external* node is also called a *leaf*.
- A node \\(u\\) is an *ancestor* of \\(v\\) if \\(u = v\\) or \\(u\\) is the ancestor of the parent of \\(v\\).
- A node \\(u\\) is a *descendant* of \\(v\\) if \\(v\\) is an ancestor of \\(u\\).
- A *subtree* at node \\(v\\) is the tree consisting of all descendants of \\(v\\).
- "Descendant" is a noun. "Descendent" is an adjective.
- An *edge* is a pair of nodes \\(u\\) and \\(v\\) such that \\(u\\) is parent of \\(v\\) or vice-versa.
- A *path* is a sequence of nodes such that any consecutive pair of nodes form an edge.
- The *depth* of \\(v\\) is the number of ancestors of \\(v\\), not counting \\(v\\) itself.
- The *height* of \\(v\\) is the distance from \\(v\\) to its deepest descendant.
- The *height* of a tree is the depth of its deepest external node.
- The *level* \\(d\\) is the set of all nodes at depth \\(d\\).

## Basic Tree Algorithms

A general linked tree structure defines each node with a value, a reference to a parent, and a sequence of references to children.

		bool isRoot(node *v)
		bool isExternal(node *v)

		node *parent(node *v)

		node *firstChild(node *v)
		node *nextChild(node *v)

Trees are naturally recursive. We can easily define recursive algorithms to give the depth and height of a node.

We can also recursively *traverse* a tree, visiting each node in either *pre-order* or *post-order*. We can also traverse in *depth-first* order using a stack, or *breadth-first* order using a queue.

## Binary Trees

Example: arithmetic expressions \\(((((3+1)\times 3)\,/\,((9−5)+2))−((3\times (7−4))+6))\\)

A binary tree has a nicer API:

		node *parent(node *v)
		node *left(node *v)
		node *right(node *v)

It's trivially easy to define

		bool isRoot(node *v)
		bool isExternal(node *v)

The following properties must hold:

- \\(h + 1 \le n \le 2^{h+1} - 1\\)
- \\(1 \le n_E \le 2^h\\)
- \\(h \le n_I \le 2^h - 1\\)
- \\(\log(n+1) - 1 \le h \le n - 1\\)

If a tree is *proper* then:

- \\(2h + 1 \le n \le 2^{h+1} - 1\\)
- \\(h + 1 \le n_e \le 2^h\\)
- \\(h \le n_I \le 2^h - 1\\)
- \\(\log(n+1) - 1 \le h \le (n - 1) / 2\\)
- If non-empty, \\(n_E = n_I + 1\\)

The maximum number of nodes at level \\(l\\) is \\(2^l\\).

Example: traversal of a binary tree to evaluate an arithmetic expression.

## Binary Search Trees

Invariant: All of the values in the left subtree of a node \\(v\\) are less than or equal to the value at \\(v\\), while all of the values in the right subtree of a node \\(v\\) are greater than the value at \\(v\\).

