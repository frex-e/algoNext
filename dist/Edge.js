class Edge {
    constructor(id, source, target, canvas, directed = false, duration = 0) {
        this._source = source;
        this._target = target;
        this._canvas = canvas;
        this._directed = directed;
        this._id = id;
        const a = canvas
            .edge([source.id(), target.id(), id])
            .duration(duration)
            .add()
            .directed(directed);
    }
    source() {
        return this._source;
    }
    target() {
        return this._target;
    }
    directed() {
        return this._directed;
    }
    /**
     * Returns the other node connected to the graph
     */
    otherNode(node) {
        if (typeof node != "string" && typeof node != "number") {
            node = node.id();
        }
        if (this._source.id() === node) {
            return this._target;
        }
        else if (this._target.id() === node) {
            return this._source;
        }
        throw new Error(`Node ${node} not found in edge ${this._id}`);
    }
    traverse(color, source = this._source, duration = 250) {
        if (typeof source != "string" && typeof source != "number") {
            source = source.id();
        }
        this._canvas
            .edge([this._source.id(), this._target.id(), this._id])
            .duration(duration / 1000)
            .traverse(color, source);
        return this;
    }
}
export default Edge;
