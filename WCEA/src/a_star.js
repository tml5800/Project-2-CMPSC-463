function aStar(graph, start, goal) {
    function heuristic(a, b) {
        return Math.sqrt(
            Math.pow(a[0] - b[0], 2) + 
            Math.pow(a[1] - b[1], 2)
        );
    }

    let open = new MinPriorityQueue();
    let cameFrom = {};
    let g = {};
    let f = {};

    for (let v of graph.nodes) {
        g[v] = Infinity;
        f[v] = Infinity;
    }

    g[start] = 0;
    f[start] = heuristic(graph.coords[start], graph.coords[goal]);

    open.enqueue(start, f[start]);

    while (!open.isEmpty()) {
        let { element: current } = open.dequeue();

        if (current === goal) break;

        for (let { node: neighbor, weight } of graph.neighbors(current)) {
            let tentative = g[current] + weight;

            if (tentative < g[neighbor]) {
                cameFrom[neighbor] = current;
                g[neighbor] = tentative;
                f[neighbor] = tentative + heuristic(graph.coords[neighbor], graph.coords[goal]);
                open.enqueue(neighbor, f[neighbor]);
            }
        }
    }

    let path = [];
    let c = goal;
    while (c) {
        path.unshift(graph.coords[c]);
        c = cameFrom[c];
    }
    return path;
}
