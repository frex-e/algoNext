import * as algoX from "algorithmx";
import Node from "./Node.js";
import Edge from "./Edge.js";
type Uuid = string | number;
declare class Graph {
    private cunter;
    _canvas: algoX.Canvas;
    private _nodes;
    private _edges;
    /**
     * Creates the graph and binds it to a DOM element.
     * @param element The element for the graph to bind to.
     * @param size The size of the graph.
     */
    constructor(element: string, size?: [number, number]);
    /**
     * Waits.
     * @param ms The amount of time to wait in ms;
     */
    pause(ms: number): void;
    /**
     * Clears the canvas.
     */
    reset(): void;
    removeAll(things: [Uuid | Node | Edge]): void;
    /**
     * Removes the corresponding object
     */
    remove(thing: Uuid | Node | Edge): void;
    /**
     * Checks whether a node exists
     * @param id The id of the node to check.
     * @returns True if the node exists, false otherwise.
     */
    hasNode(id: Uuid): boolean;
    /**
     * Creates a node and adds it to the canvas
     * @param id The id of the node to add.
     * @returns The the newly created node.
     */
    addNode(id: Uuid): Node;
    /**
     * Removes the node corresponding to id from the canvas.
     * @param id The id of the node to remove.
     */
    removeNode(id: Uuid): void;
    /**
     * Finds the node corresponding to id, and returns it.
     * @param id The id of the node to find
     * @returns The corresponding node object.
     */
    node(id: Uuid): Node;
    nodes(): Node[];
    /**
     * Creates an edge between two nodes and adds it to the canvas.
     * @param source The source node of the edge.
     * @param target The target node of the edge.
     * @param directed Whether the edge is directed or not.
     * @returns The newly created edge.
     * @throws Error if either source or target does not exist.
     */
    addEdge(source: Uuid | Node, target: Uuid | Node, directed?: boolean): Edge;
    /**
     * Returns edges between two specified nodes
     * @param source The source node of the edge.
     * @param target The target node of the edge.
     * @param directed Whether you care about direction or not.
     */
    edgesBetween(source: Uuid | Node, target: Uuid | Node, directed?: boolean): Edge[];
    /**
     * @returns all edges
     */
    edges(): Edge[];
    gnpRandomGraph(n: number, p: number, directed?: boolean): this;
    /**
     * Creates a random connected graph with n nodes and an edge probability of p.
     */
    gnpRandomConnectedGraph(n: number, p: number, directed?: boolean): this;
}
export default Graph;
