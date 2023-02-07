import type { Canvas } from 'algorithmx';
import type Edge from './Edge.js';
export type NodeProperties = {
    color?: string;
    label?: string | number;
    size?: string | number;
    pos?: [number, number];
};
/**
 * A node in a graph.
 */
declare class Node {
    private _canvas;
    private _label;
    private _id;
    private _color;
    data: Record<string | number, any>;
    /**
     * Please do not touch, it will break things.
     */
    _edges: Edge[];
    /**
     * You should not call this constructor directly.
     */
    constructor(id: string | number, canvas: Canvas, duration?: number);
    setLabel(label: string | number): this;
    getLabel(): string | number;
    /**
     * @returns The id of the node.
     */
    id(): string | number;
    /**
     * @param color The color of the node.
     */
    setColor(color: string, duration?: number): this;
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
    setData(key: string, value: any): this;
    getData(key: string): any;
    setPosition(x: number, y: number): this;
    highlight(color?: string, delay?: number): this;
    setSize(size: number | string): this;
    setFixed(fixed: boolean): this;
    setProperties(properties: NodeProperties, duration?: number): void;
}
export default Node;
