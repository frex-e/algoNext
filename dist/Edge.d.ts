import type { Canvas } from "algorithmx";
import type Node from "./Node.js";
declare class Edge {
    private _canvas;
    private _source;
    private _target;
    private _directed;
    _id: number;
    constructor(id: number, source: Node, target: Node, canvas: Canvas, directed?: boolean, duration?: number);
    source(): Node;
    target(): Node;
    directed(): boolean;
    /**
     * Returns the other node connected to the graph
     */
    otherNode(node: Node | string | number): Node;
    traverse(color: string, source?: Node | string | number, duration?: number): this;
}
export default Edge;
