# Arrays and Linked Lists

Review: Chapters 1 and 2 of Goodrich et al represent a review of CSC 1253 / 1350 Introduction to Computer Science I and CSC 1254 / 1351 Introduction to Computer Science II. They are there for reference, as needed.

Reading: Chapter 3 of Goodrich et al.

## Sequence Containers

A sequence container is a simple 1-dimensional collection of elements. All sequence containers share the same set of basic operations:

- Append
- Insert
- Erase
- Index
- Size
- Find

## Arrays

- Arrays have a static size. Expansion beyond the maximum is disallowed.
- Elements are stored contiguously and sequentially in memory.
- Thus, elements are referred to by index.
- The element count must be stored.

## Singly Linked Lists

- Lists have dynamic size.
- Elements need *not* be stored contiguously or even in sequential order.
- Elements are referred to by reference.
- Each element contains a reference to the following element. This is *overhead*.
- A reference to a singly linked list consists of only a reference to its first element.

## Doubly Linked Lists

- Each element contains a reference to both the preceding element and the following element. This is even greater overhead.
- A reference to a doubly linked list consists of references to both its first and last elements.

## Summary of Operations

Given a collection containing N elements, how many steps are required (in the worst-case scenario) to perform each basic operation?

| Operation   | Array   | Single  | Double  |
| ----------- | ------- | ------- | ------- |
| Append      |   1     |    N    |    1    |
| Insert      |   N     |    1    |    1    |
| Erase       |   N     |    N    |    1    |
| Index       |   1     |    N    |    N    |
| Size        |   1     |    N    |    N    |
| Find        |   N     |    N    |    N    |

## Things to consider

- Which of these containers can be easily enumerated in reverse order?

- All of these operations can fail in some fashion. How?

- Some of these basic operations be sped up by storing "meta" data. How?

- How would you find the smallest element in a collection of numbers? The largest?

- If we know the elements appear in some sorted order, how does each of the basic operations change?

- If you're enumerating a sequence container and you decide to delete an element, what care must be taken to ensure that you can continue scanning?
