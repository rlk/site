# Stacks, Queues, and Deques

Reading: Chapter 5 of Goodman et al.

All of the operations on stacks, queues, and deques are \\(O(1)\\). 

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

	`top` and `dequeue` might throw.

- Implementation

	- Using an array

		Use a circular indexing.

	- Using a linked list

		Use a circular singularly-linked list, or a doubly-linked list.

	`enqueue` might throw.

## Traversal

- Using a stack
- Using a queue

## Deque

- Interface

		void insertFront(T)
		void insertBack(T)
		void eraseFront()
		void eraseBack()
		T front()
		T back()
		int size()

