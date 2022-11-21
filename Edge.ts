import type { Canvas } from "algorithmx";
import type Node from "./Node";

class Edge {
  private _canvas: Canvas;
  private _source: Node;
  private _target: Node;
  private _directed: boolean;
  _id: number;

  constructor(
    id: number,
    source: Node,
    target: Node,
    canvas: Canvas,
    directed: boolean = false
  ) {
    this._source = source;
    this._target = target;
    this._canvas = canvas;
    this._directed = directed;
    this._id = id;

    const a = canvas
      .edge([source.id(), target.id(), id])
      .duration(0.001)
      .add()
      .directed(directed);
  }

  source(): Node {
    return this._source;
  }

  target(): Node {
    return this._target;
  }

  directed(): boolean {
    return this._directed;
  }

  /**
   * Returns the other node connected to the graph
   */
  otherNode(node: Node | string | number): Node {
    if (typeof node != "string" && typeof node != "number") {
      node = node.id();
    }
    if (this._source.id() === node) {
      return this._target;
    } else if (this._target.id() === node) {
      return this._source;
    }
    throw new Error(`Node ${node} not found in edge ${this._id}`);
  }

  traverse(color: string, source: Node | string | number = this._source) {
    if (typeof source != "string" && typeof source != "number") {
      source = source.id();
    }

    this._canvas
      .edge([this._source.id(), this._target.id(), this._id])
      .traverse(color, source);

    return this
  }
}

export default Edge;
