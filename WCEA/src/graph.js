class Graph {
    constructor(data) {
        this.coords = data.nodes;
        this.edges = data.edges;
        this.nodes = Object.keys(this.coords);
    }

    neighbors(node) {
        return this.edges[node] || [];
    }

    closestNode(latlng) {
        let nearest = null;
        let best = Infinity;
        for (let n in this.coords) {
            let c = this.coords[n];
            let d = Math.sqrt(
                Math.pow(latlng[0] - c[0], 2) +
                Math.pow(latlng[1] - c[1], 2)
            );
            if (d < best) { best = d; nearest = n; }
        }
        return nearest;
    }
}
