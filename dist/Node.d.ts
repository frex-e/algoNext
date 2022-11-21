import type { Canvas } from 'algorithmx';
import type Edge from './Edge';
/**
 * A node in a graph.
 */
declare class Node {
    private _canvas;
    private _value;
    private _label;
    private _id;
    private _color;
    attributes: Record<string | number, any>;
    /**
     * Please do not touch, it will break things.
     */
    _edges: Edge[];
    /**
     * You should not call this constructor directly.
     */
    constructor(id: string | number, canvas: Canvas);
    setValue(value: any): this;
    getValue(): any;
    setLabel(label: string | number): this;
    /**
     * @returns The id of the node.
     */
    id(): string | number;
    /**
     * @param color The color of the node.
     */
    setColor(color: string): this;
    /**
     * @returns The color of the node.
     */
    getColor(): string;
    /**
     * @returns a list of edges
     */
    edges(): Edge[];
    /**
     * @returns a list of all incoming edges
     */
    incomingEdges(): Edge[];
    /**
     * @returns A list of outoging edges
     */
    outgoingEdges(): Edge[];
    adjacentNodes(): Node[];
    predecessorNodes(): Node[];
    successorNodes(): Node[];
    degree(): number;
    indegree(): number;
    outdegree(): number;
    setAttribute(key: string, value: any): this;
    getAttribute(key: string): any;
    setPosition(x: number, y: number): this;
    highlight(color?: string, delay?: number): this;
    /**
     * Exposes underlying algox api which gives more control.
     * If you wish to use, view Algorithmx's documentation on highlight.
     */
    rawHighlight(): import("algorithmx").NodeSelection<string | number>;
    setSize(size: number | string): this;
    setFixed(fixed: boolean): this;
}
export default Node;
