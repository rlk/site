# Stacks, Queues, and Deques

Reading: Chapter 5 of Goodman et al.

All of the operations on stacks, queues, and deques are $O(1)$. 

## Stack

Last-in-first-out.

- Interface

		void push(T)
		void pop()
		T top()
		int size()

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
		void dequeue()
		T front()
		int size()

	`front` and `dequeue` might throw.

- Implementation

	- Using an array

		Use a circular indexing.

	- Using a linked list

		Use a circular singularly-linked list, or a doubly-linked list.

	`enqueue` might throw.

## Abstraction

It's easy to implement each of these in terms of a simpler existing, more general data structure, such as a doubly-linked list:

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

- Implementation

	Easily implemented atop a doubly-linked list data structure.

	But commonly implemented as a doubly-linked list of arrays, to great effect.

## Traversal

Stacks and queues present fundamentally the same API. As such, they are drop-in replacements for one another. The resulting difference in behavior is one of the fundamental distinctions in all of Computer Science: depth versus breadth.



