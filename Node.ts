import type { Canvas } from 'algorithmx'
import type Edge from './Edge.js';

/**
 * A node in a graph.
 */
class Node {
  private _canvas : Canvas;
  private _value : any;
  private _label : any = null;

  // private _labels : Record<string | number,any> = {};

  private _id : string | number;
  private _color : string = 'gray';
  attributes : Record<string | number,any> = {};

  /**
   * Please do not touch, it will break things.
   */
  _edges : Edge[] = [];
  
  /**
   * You should not call this constructor directly.
   */
  constructor(id : string | number, canvas : Canvas) {
    this._id = id;
    this._canvas = canvas;

    canvas.node(id).duration(0.01).add().color(this._color);
    return this;
  }

  setValue(value : any) {
    this._value = value;
    this._canvas.node(this._id).label(0).text(value).add();

    return this
  }

  getValue() : any {
    return this._value;
  }

  setLabel(label : string | number) {
    this._label = label;
    this._canvas.node(this._id).label("label").text(label).color('black').duration(0).add();
    return this
  }

  /**
   * @returns The id of the node.
   */
  id() : string | number {
    return this._id;
  }

  /**
   * @param color The color of the node.
   */
  setColor(color : string) {
    this._color = color;
    this._canvas.node(this._id).color(color);
    return this
  }

  /**
   * @returns The color of the node.
   */
  getColor() : string {
    return this._color;
  }

  /**
   * @returns a list of edges
   */
  edges() : Edge[] {
    // This may be unnecessary
    return this._edges.filter(edge => true);
  }

  /**
   * @returns a list of all incoming edges
   */
  incomingEdges() : Edge[] {
    return this._edges.filter(edge => edge.target().id() === this._id || edge.directed() === false);
  }

  /**
   * @returns A list of outoging edges
   */
  outgoingEdges() : Edge[] {
    return this._edges.filter(edge => edge.source().id() === this._id || edge.directed() === false);
  }

  adjacentNodes() : Node[] {
    // Psssh overhead whose ever heard of that ???? 
    return [...new Set(this._edges.map(edge => edge.otherNode(this)))];
  }

  predecessorNodes() : Node[] {
    return [... new Set(this.incomingEdges().map(edge => edge.otherNode(this)))];
  }

  successorNodes() : Node[] {
    return [... new Set(this.outgoingEdges().map(edge => edge.otherNode(this)))];
  }

  degree() : number {
    return this._edges.length;
  }

  indegree() : number {
    return this.incomingEdges().length;
  }

  outdegree() : number {
    return this.outgoingEdges().length;
  }

  setAttribute(key : string, value : any) {
    this.attributes[key] = value;
    return this
  }

  getAttribute(key : string) : any {
    return this.attributes[key];
  }

  setPosition(x : number, y : number) {
    this._canvas.node(this._id).pos([x, y]);
    return this
  }

  highlight(color : string = 'red',delay : number = 250) {
    this._canvas.node(this._id).highlight(delay/1000).duration(delay/1000).color(color).size('1.25x');
    return this
  }
  /**
   * Exposes underlying algox api which gives more control.
   * If you wish to use, view Algorithmx's documentation on highlight.
   */
  rawHighlight() {
    return this._canvas.node(this._id).highlight();
  }

  setSize(size : number | string) {
    this._canvas.node(this._id).size(size);
    return this
  }

  setFixed(fixed : boolean) {
    this._canvas.node(this._id).fixed(fixed);
    return this
  }
}

export default Node