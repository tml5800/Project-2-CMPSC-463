function dijkstra(graph, start, end) {
    let dist = {}, prev = {};
    let pq = new MinPriorityQueueSimple();

    graph.nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });
    dist[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        let u = pq.dequeue().element;
        if (u === end) break;

        for (let e of graph.neighbors(u)) {
            let v = e.node;
            let alt = dist[u] + e.weight;

            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
                pq.enqueue(v, alt);
            }
        }
    }

    let path = [];
    let cur = end;
    while (cur) { path.unshift(cur); cur = prev[cur]; }
    return path;
}
