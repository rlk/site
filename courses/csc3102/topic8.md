# Graphs

Reading: Chapter 13 of Coodrich et al.

A graph $G$ is a collection $V$ of *vertices* with a collection $E$ of vertex pairs known as *edges*.

## Graph Terminology

- Each edge is either *directed* or *undirected*. If undirected, then an edge $(u, v)$ is equal to the edge $(v, u)$.
- If all edges are directed then the graph is "directed." If all edges are undirected then the graph is "undirected." Otherwise, the graph is "mixed."

	- An undirected graph: Facebook
	- A directed graph: Twitter
	- A mixed graph: City streets

- Two vertices are *adjacent* if an edge connects them. Two edges are *adjacent* if they share a vertex.
- The *degree* of a vertex is the number of edges touching it. A directed graph has separate *in-degree* and *out-degree*.
- When two edges share the same pair of vertices, these are *parallel* edges.
- When an edge has the same vertex at both ends, it is a *self loop*.
- A *simple* graph has no parallel edges or self loops.
- A *path* is a sequence of vertices and edges that connect a pair of vertices.
- A *cycle* is a path that begins and ends at the same vertex.
- A *tree* is a graph with no cycles.
- A *subgraph* $H$ of a graph $G$ is a graph whose vertex and edge sets are subsets of the vertex and edge sets of $G$.
- A graph is *connected* if there exists a path between any two vertices.
- A *spanning* subgraph includes *all* of the vertices of $G$.
- A *spanning tree* is a spanning subgraph with no cycles.

## Basic Graph ADT Operations

Operations on graphs

&emsp;vertices()  
&emsp;edges()  
&emsp;insertVertex(x)  
&emsp;insertEdge(u, v, a)  
&emsp;eraseVertex(v)  
&emsp;eraseEdge(e)

Operations on vertices

&emsp;incidentEdges(v)  
&emsp;isAdjacentTo(u, v)

Operations on edges

&emsp;endVertices(e)  
&emsp;opposite(e, v)  
&emsp;isIncidentOn(e, v)

## Graph Representations

| Operation     | Edge List  | Adjacency List             | Matrix     |
|---------------|------------|----------------------------|------------|
| vertices      | $O(n)$     | $O(n)$                     | $O(n)$     |
| edges         | $O(m)$     | $O(m)$                     | $O(n^2)$   |
| endVertices   | $O(1)$     | $O(1)$                     | $O(1)$     |
| opposite      | $O(1)$     | $O(1)$                     | $O(1)$     |
| incidentEdges | $O(m)$     | $O(\deg(v))$               | $O(n)$     |
| isAdjacentTo  | $O(m)$     | $O(\min(\deg(v),\deg(w)))$ | $O(1)$     |
| isIncidentOn  | $O(1)$     | $O(1)$                     | $O(1)$     |
| insertVertex  | $O(1)$     | $O(1)$                     | $O(n^2)$   |
| insertEdge    | $O(1)$     | $O(1)$                     | $O(1)$     |
| eraseVertex   | $O(m)$     | $O(\deg(v))$               | $O(n^2)$   |
| eraseEdge     | $O(1)$     | $O(1)$                     | $O(1)$     |

## Traversal

## Shortest Past

## Minimum Spanning Tree
