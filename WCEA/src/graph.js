class Graph {
    constructor(data) {
        this.coords = data.nodes;
        this.edges = data.edges;
        this.nodes = Object.keys(data.nodes);
    }

    neighbors(node) {
        return this.edges[node] || [];
    }

    // Find closest graph node to coordinates
    closestNode(latlng) {
        let nearest = null;
        let bestDist = Infinity;

        for (let node in this.coords) {
            let c = this.coords[node];
            let d = Math.sqrt(
                Math.pow(latlng[0] - c[0], 2) +
                Math.pow(latlng[1] - c[1], 2)
            );

            if (d < bestDist) {
                bestDist = d;
                nearest = node;
            }
        }
        return nearest;
    }
}
