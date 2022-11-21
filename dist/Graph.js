"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algoX = __importStar(require("algorithmx"));
const Node_1 = __importDefault(require("./Node"));
const Edge_1 = __importDefault(require("./Edge"));
class Graph {
    /**
     * Creates the graph and binds it to a DOM element.
     * @param element The element for the graph to bind to.
     * @param size The size of the graph.
     */
    constructor(element, size = [400, 400]) {
        this.cunter = 0;
        this._nodes = [];
        this._edges = [];
        this._canvas = algoX.createCanvas(element);
        this._canvas.size(size).zoomtoggle(true);
        return this;
    }
    /**
     * Waits.
     * @param ms The amount of time to wait in ms;
     */
    pause(ms) {
        this._canvas.pause(ms / 1000);
    }
    /**
     * Clears the canvas.
     */
    reset() {
        console.log("Gone nuclear");
        this._canvas.queues().clear();
        this._canvas.nodes().duration(0).remove();
        this._canvas.edges().duration(0).remove();
        this._canvas.queues().clear();
        this._nodes = [];
        this._edges = [];
    }
    removeAll(things) {
        things.forEach((thing) => {
            this.remove(thing);
        });
    }
    /**
     * Removes the corresponding object
     */
    remove(thing) {
        if (thing instanceof Node_1.default) {
            thing = thing.id();
        }
        if (thing instanceof Edge_1.default) {
            thing.source()._edges = thing
                .source()
                ._edges.filter((edge) => edge !== thing);
            thing.target()._edges = thing
                .target()
                ._edges.filter((edge) => edge !== thing);
            this._canvas.edge([thing.source(), thing.target(), thing._id]).remove();
        }
        else {
            if (!this.hasNode(thing)) {
                return;
            }
            this._canvas.node(thing).remove();
            this._edges = this._edges.filter((edge) => edge.source().id() !== thing && edge.target().id() !== thing);
            this._nodes = this._nodes.filter((node) => node.id() !== thing);
        }
    }
    // NODE STUFF
    /**
     * Checks whether a node exists
     * @param id The id of the node to check.
     * @returns True if the node exists, false otherwise.
     */
    hasNode(id) {
        return this._nodes.some((node) => node.id() == id);
    }
    /**
     * Creates a node and adds it to the canvas
     * @param id The id of the node to add.
     * @returns The the newly created node.
     */
    addNode(id) {
        if (this.hasNode(id)) {
            throw new Error(`Node with id ${id} already exists`);
        }
        const node = new Node_1.default(id, this._canvas);
        this._nodes.push(node);
        return node;
    }
    /**
     * Removes the node corresponding to id from the canvas.
     * @param id The id of the node to remove.
     */
    removeNode(id) {
        this._canvas.node(id).remove();
        this._nodes = this._nodes.filter((node) => node.id() !== id);
    }
    /**
     * Finds the node corresponding to id, and returns it.
     * @param id The id of the node to find
     * @returns The corresponding node object.
     */
    node(id) {
        const res = this._nodes.find((node) => node.id() === id);
        if (res === undefined) {
            throw new Error(`Node ${id} not found`);
        }
        else {
            return res;
        }
    }
    nodes() {
        return this._nodes;
    }
    // EDGE STUFF
    /**
     * Creates an edge between two nodes and adds it to the canvas.
     * @param source The source node of the edge.
     * @param target The target node of the edge.
     * @param directed Whether the edge is directed or not.
     * @returns The newly created edge.
     * @throws Error if either source or target does not exist.
     */
    addEdge(source, target, directed = false) {
        if (typeof source === "string" || typeof source === "number") {
            source = this.node(source);
        }
        if (typeof target === "string" || typeof target === "number") {
            target = this.node(target);
        }
        const edge = new Edge_1.default(this.cunter++, source, target, this._canvas, directed);
        source._edges.push(edge);
        target._edges.push(edge);
        this._edges.push(edge);
        return edge;
    }
    /**
     * Returns edges between two specified nodes
     * @param source The source node of the edge.
     * @param target The target node of the edge.
     * @param directed Whether you care about direction or not.
     */
    edgesBetween(source, target, directed = true) {
        if (typeof source === "string" || typeof source === "number") {
            source = this.node(source);
        }
        if (typeof target === "string" || typeof target === "number") {
            target = this.node(target);
        }
        if (!directed) {
            return this._edges.filter((edge) => (edge.source() === source && edge.target() === target) ||
                (edge.source() === target && edge.target() === source));
        }
        else {
            return this._edges.filter((edge) => (edge.source() === source && edge.target() === target) ||
                (edge.source() === target &&
                    edge.target() === source &&
                    !edge.directed()));
        }
    }
    /**
     * @returns all edges
     */
    edges() {
        return this._edges;
    }
    gnpRandomGraph(n, p, directed = false) {
        if (this._nodes.length > 0) {
            throw new Error("Graph already has nodes.");
        }
        for (let i = 0; i < n; i++) {
            this.addNode(i);
        }
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (Math.random() < p) {
                    this.addEdge(i, j, directed);
                }
                if (directed) {
                    if (Math.random() < p) {
                        this.addEdge(j, i, directed);
                    }
                }
            }
        }
        return this;
    }
    /**
     * Creates a random connected graph with n nodes and an edge probability of p.
     */
    gnpRandomConnectedGraph(n, p, directed = false) {
        if (this._nodes.length > 0) {
            throw new Error("Graph already has nodes.");
        }
        for (let i = 0; i < n; i++) {
            let current = this.addNode(i);
            this.addEdge(current, this.node(Math.floor(Math.random() * i)), directed);
        }
        if (!directed) {
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    if (i !== j && this.edgesBetween(i, j).length == 0) {
                        if (Math.random() < p) {
                            this.addEdge(i, j, directed);
                        }
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i !== j && !this.node(i).successorNodes().includes(this.node(j))) {
                        if (Math.random() < p) {
                            this.addEdge(i, j, directed);
                        }
                    }
                }
            }
        }
        return this;
    }
}
exports.default = Graph;
