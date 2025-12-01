class Graph {
    constructor(data) {
        this.nodes = Object.keys(data.nodes);
        this.edges = data.edges;
        this.coords = data.nodes;
    }

    neighbors(node) {
        return this.edges[node];
    }
}
