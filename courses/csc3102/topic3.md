# Stacks, Queues, and Deques

- C++ Reading: Chapter 5 Stacks, Queues, and Deques
- Java Reading: Chapter 6 Stacks, Queues, and Deques

All of the operations on stacks, queues, and deques are $O(1)$. 

## Stack

Last-in-first-out.

- Interface

		void push(T)
		T pop()
		T top()
		int size()
		bool isEmpty()

	`top` and `pop` might throw.

- Implementation

	- Using an array
	- Using a linked list

	`push` might throw.

- Applications

	- Sequence reversing
	- Parenthesis matching
	- Function calling

## Queue

First-in-first-out.

- Interface

		void enqueue(T)
		T dequeue()
		T front()
		int size()
		bool isEmpty()

	`front` and `dequeue` might throw.

- Implementation

	- Using an array

		Use a circular indexing.

		&emsp; enqueue(e)  
		&emsp;&emsp; if $n = m$  
		&emsp;&emsp;&emsp; 	throw  
		&emsp;&emsp; $i\gets (f + n)\,\%\,m$  
		&emsp;&emsp; $A[i]\gets e$  
		&emsp;&emsp; $n\gets n + 1$

		&emsp; dequeue()  
		&emsp;&emsp; if $n = 0$  
		&emsp;&emsp;&emsp; throw  
		&emsp;&emsp; $r\gets A[f]$  
		&emsp;&emsp; $f\gets (f + 1)\,\%\,m$  
		&emsp;&emsp; $n\gets n - 1$  
		&emsp;&emsp; return $r$

	- Using a linked list

		Use a circular singularly-linked list, or a doubly-linked list.

	`enqueue` might throw.

## Abstraction

It's easy to implement all of these in terms of a simpler existing, more general data structure, such as a doubly-linked list:

		node *firstNode()
		node *lastNode()
		void remove(node *n)
		void insertAfter(node *n, T e)
		void insertBefore(node *n, T e)

## Deque

- Interface

		void insertFront(T)
		void insertBack(T)
		void eraseFront()
		void eraseBack()
		T front()
		T back()
		int size()
		bool isEmpty()

- Implementation

	Easily implemented atop a doubly-linked list data structure.

	But commonly implemented as a doubly-linked list of arrays, to great effect.

## Traversal

Stacks and queues present fundamentally the same API.

| Stack   | Queue   | Abstraction |
|---------|---------|-------------|
| push    | enqueue | insert      |
| pop     | dequeue | remove      |
| top     | front   | first       |
| size    | size    | size        |
| isEmpty | isEmpty | isEmpty     |

As such, they are drop-in replacements for one another. Looking forward to the next chapter, on trees, we can traverse a tree using either a stack or a queue. The resulting difference in behavior is one of the fundamental distinctions in all of Computer Science: depth versus breadth.

&emsp; traverse($v$)  
&emsp;&emsp; C.insert($v$)  
&emsp;&emsp; while not C.isEmpty()  
&emsp;&emsp;&emsp; $v$ = C.remove()  
&emsp;&emsp;&emsp; visit($v$)  
&emsp;&emsp;&emsp; if $v$.left  
&emsp;&emsp;&emsp;&emsp; C.insert($v$.left)  
&emsp;&emsp;&emsp; if $v$.right  
&emsp;&emsp;&emsp;&emsp; C.insert($v$.right)  


