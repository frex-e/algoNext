/**
 * A node in a graph.
 */
class Node {
    /**
     * You should not call this constructor directly.
     */
    constructor(id, canvas, duration = 0) {
        this._label = null;
        this._color = 'gray';
        this.data = {};
        /**
         * Please do not touch, it will break things.
         */
        this._edges = [];
        this._id = id;
        this._canvas = canvas;
        canvas.node(id).duration(duration / 1000).add().color(this._color);
        return this;
    }
    setLabel(label) {
        this._label = label;
        this._canvas.node(this._id).label("label").text(label).color('black').duration(0).add();
        return this;
    }
    getLabel() {
        return this._label;
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
    setColor(color, duration = 250) {
        this._color = color;
        this._canvas.node(this._id).duration(duration / 1000).color(color);
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
    setData(key, value) {
        this.data[key] = value;
        return this;
    }
    getData(key) {
        return this.data[key];
    }
    setPosition(x, y) {
        this._canvas.node(this._id).pos([x, y]);
        return this;
    }
    highlight(color = 'red', delay = 250) {
        this._canvas.node(this._id).highlight(delay / 1000).duration(delay / 1000).color(color).size('1.25x');
        return this;
    }
    setSize(size) {
        this._canvas.node(this._id).size(size);
        return this;
    }
    setFixed(fixed) {
        this._canvas.node(this._id).fixed(fixed);
        return this;
    }
    setProperties(properties, duration = 250) {
        let nodeSelection = this._canvas.node(this._id).duration(duration / 1000);
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
export default Node;
