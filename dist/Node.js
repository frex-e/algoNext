"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A node in a graph.
 */
class Node {
    /**
     * You should not call this constructor directly.
     */
    constructor(id, canvas) {
        this._label = null;
        this._color = 'gray';
        this.attributes = {};
        /**
         * Please do not touch, it will break things.
         */
        this._edges = [];
        this._id = id;
        this._canvas = canvas;
        canvas.node(id).duration(0.01).add().color(this._color);
        return this;
    }
    setValue(value) {
        this._value = value;
        this._canvas.node(this._id).label(0).text(value).add();
        return this;
    }
    getValue() {
        return this._value;
    }
    setLabel(label) {
        this._label = label;
        this._canvas.node(this._id).label("label").text(label).color('black').duration(0).add();
        return this;
    }
    /**
     * @returns The id of the node.
     */
    id() {
        return this._id;
    }
    /**
     * @param color The color of the node.
     */
    setColor(color) {
        this._color = color;
        this._canvas.node(this._id).color(color);
        return this;
    }
    /**
     * @returns The color of the node.
     */
    getColor() {
        return this._color;
    }
    /**
     * @returns a list of edges
     */
    edges() {
        // This may be unnecessary
        return this._edges.filter(edge => true);
    }
    /**
     * @returns a list of all incoming edges
     */
    incomingEdges() {
        return this._edges.filter(edge => edge.target().id() === this._id || edge.directed() === false);
    }
    /**
     * @returns A list of outoging edges
     */
    outgoingEdges() {
        return this._edges.filter(edge => edge.source().id() === this._id || edge.directed() === false);
    }
    adjacentNodes() {
        // Psssh overhead whose ever heard of that ???? 
        return [...new Set(this._edges.map(edge => edge.otherNode(this)))];
    }
    predecessorNodes() {
        return [...new Set(this.incomingEdges().map(edge => edge.otherNode(this)))];
    }
    successorNodes() {
        return [...new Set(this.outgoingEdges().map(edge => edge.otherNode(this)))];
    }
    degree() {
        return this._edges.length;
    }
    indegree() {
        return this.incomingEdges().length;
    }
    outdegree() {
        return this.outgoingEdges().length;
    }
    setAttribute(key, value) {
        this.attributes[key] = value;
        return this;
    }
    getAttribute(key) {
        return this.attributes[key];
    }
    setPosition(x, y) {
        this._canvas.node(this._id).pos([x, y]);
        return this;
    }
    highlight(color = 'red', delay = 250) {
        this._canvas.node(this._id).highlight(delay / 1000).duration(delay / 1000).color(color).size('1.25x');
        return this;
    }
    /**
     * Exposes underlying algox api which gives more control.
     * If you wish to use, view Algorithmx's documentation on highlight.
     */
    rawHighlight() {
        return this._canvas.node(this._id).highlight();
    }
    setSize(size) {
        this._canvas.node(this._id).size(size);
        return this;
    }
    setFixed(fixed) {
        this._canvas.node(this._id).fixed(fixed);
        return this;
    }
}
exports.default = Node;
