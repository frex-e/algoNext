import type { Canvas } from 'algorithmx'
import type Edge from './Edge.js';

export type NodeProperties = {
  color?: string,
  label?: string | number,
  size?: string | number,
  pos?: [number, number]
}
/**
 * A node in a graph.
 */
class Node {
  private _canvas : Canvas;
  private _label : any = null;

  // private _labels : Record<string | number,any> = {};

  private _id : string | number;
  private _color : string = 'gray';
  data : Record<string | number,any> = {};

  /**
   * Please do not touch, it will break things.
   */
  _edges : Edge[] = [];
  
  /**
   * You should not call this constructor directly.
   */
  constructor(id : string | number, canvas : Canvas,duration : number = 0) {
    this._id = id;
    this._canvas = canvas;

    canvas.node(id).duration(duration/1000).add().color(this._color);
    return this;
  }

  setLabel(label : string | number) {
    this._label = label;
    this._canvas.node(this._id).label("label").text(label).color('black').duration(0).add();
    return this
  }

  getLabel() : string | number {
    return this._label;
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
  setColor(color : string,duration : number = 250) {
    this._color = color;
    this._canvas.node(this._id).duration(duration/1000).color(color);
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

  setData(key : string, value : any) {
    this.data[key] = value;
    return this
  }

  getData(key : string) : any {
    return this.data[key];
  }

  setPosition(x : number, y : number) {
    this._canvas.node(this._id).pos([x, y]);
    return this
  }

  highlight(color : string = 'red',delay : number = 250) {
    this._canvas.node(this._id).highlight(delay/1000).duration(delay/1000).color(color).size('1.25x');
    return this
  }

  setSize(size : number | string) {
    this._canvas.node(this._id).size(size);
    return this
  }

  setFixed(fixed : boolean) {
    this._canvas.node(this._id).fixed(fixed);
    return this
  }

  
  setProperties(properties : NodeProperties, duration : number = 250) {
    let nodeSelection = this._canvas.node(this._id).duration(duration/1000)
    if (properties.color) {
      nodeSelection.color(properties.color);
    }
    if (properties.label) {
      nodeSelection.label('label').text(properties.label);
    }
    if (properties.size) {
      nodeSelection.size(properties.size);
    }
    if (properties.pos) {
      nodeSelection.pos(properties.pos);
    }
  }
}

export default Node