// Initialize map
var map = L.map('map').setView([40.0, -75.0], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let graph;
fetch("data/sample_graph.json")
    .then(res => res.json())
    .then(data => graph = new Graph(data));

async function findRoute() {
    let start = document.getElementById("startInput").value.split(",");
    let dest = document.getElementById("destInput").value.split(",");

    let path = dijkstra(graph, start, dest);  // or aStar()

    for (let i = 0; i < path.length - 1; i++) {
        L.polyline([path[i], path[i+1]], { color: "red" }).addTo(map);
    }
}
