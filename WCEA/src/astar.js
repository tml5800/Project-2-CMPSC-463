function heuristic(a, b) {
    let dx = a[0] - b[0], dy = a[1] - b[1];
    return Math.sqrt(dx*dx + dy*dy);
}

function astar(graph, start, end) {
    let open = new MinPriorityQueueSimple();
    let g = {}, f = {}, prev = {};

    graph.nodes.forEach(n => { g[n] = Infinity; f[n] = Infinity; prev[n] = null; });

    g[start] = 0;
    f[start] = heuristic(graph.coords[start], graph.coords[end]);
    open.enqueue(start, f[start]);

    while (!open.isEmpty()) {
        let u = open.dequeue().element;
        if (u === end) break;

        for (let e of graph.neighbors(u)) {
            let v = e.node;
            let cost = g[u] + e.weight;
            if (cost < g[v]) {
                g[v] = cost;
                f[v] = cost + heuristic(graph.coords[v], graph.coords[end]);
                prev[v] = u;
                open.enqueue(v, f[v]);
            }
        }
    }

    let path = [];
    let cur = end;
    while (cur) { path.unshift(cur); cur = prev[cur]; }
    return path;
}
