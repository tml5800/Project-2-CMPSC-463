function dijkstra(graph, start, end) {
    let dist = {};
    let prev = {};
    let pq = new MinPriorityQueue();

    for (let v of graph.nodes) {
        dist[v] = Infinity;
    }

    dist[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        let { element: u } = pq.dequeue();
        if (u === end) break;

        for (let { node: v, weight } of graph.neighbors(u)) {
            let alt = dist[u] + weight;
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
                pq.enqueue(v, alt);
            }
        }
    }

    let path = [];
    let u = end;
    while (u) {
        path.unshift(graph.coords[u]);
        u = prev[u];
    }
    return path;
}
