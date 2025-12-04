// --------------------------------------
// MAP INIT
// --------------------------------------
var map = L.map('map').setView([39.955, -75.165], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// --------------------------------------
// DANGER ZONES
// --------------------------------------
let dangerZones = [
    { coords: [39.9520, -75.1650], radius: 1300 },
    { coords: [39.9650, -75.1450], radius: 1200 },
    { coords: [39.9400, -75.1650], radius: 1100 }
];

dangerZones.forEach(z => {
    L.circle(z.coords, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: z.radius
    }).addTo(map);
});

// --------------------------------------
// SAFE ZONES
// --------------------------------------
let safeZones = [
    { name: "North Shelter", coords: [39.9800, -75.1450] },
    { name: "South Shelter", coords: [39.9300, -75.1600] }
];

safeZones.forEach(z => {
    L.circle(z.coords, {
        color: "green",
        fillColor: "green",
        fillOpacity: 0.3,
        radius: 900
    }).addTo(map).bindPopup(z.name);
});

// --------------------------------------
// GEOCODER
// --------------------------------------
async function geocode(addr) {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr + " Philadelphia")}`;
    let res = await fetch(url);
    let data = await res.json();
    if (!data.length) return null;
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

// --------------------------------------
// LOAD GRAPH
// --------------------------------------
async function loadGraph() {
    return new Graph(await fetch("data/philly_graph.json").then(r => r.json()));
}

// Avoid nodes inside danger zones
function penalizeDanger(graph) {
    let dangerPenalty = 999999;
    for (let n in graph.coords) {
        let c = graph.coords[n];
        dangerZones.forEach(z => {
            let dist = Math.sqrt(
                Math.pow(c[0] - z.coords[0], 2) +
                Math.pow(c[1] - z.coords[1], 2)
            );
            let rd = z.radius / 111320;
            if (dist < rd) {
                graph.edges[n].forEach(e => e.weight += dangerPenalty);
            }
        });
    }
}

// --------------------------------------
// ROUTES
// --------------------------------------
async function findSafestRoute() {
    let sA = document.getElementById("startAddress").value;
    let eA = document.getElementById("endAddress").value;

    let s = await geocode(sA);
    let e = await geocode(eA);
    if (!s || !e) return alert("Invalid addresses.");

    let graph = await loadGraph();
    penalizeDanger(graph);

    let sN = graph.closestNode(s);
    let eN = graph.closestNode(e);

    let path = dijkstra(graph, sN, eN);
    let pts = path.map(n => graph.coords[n]);

    L.polyline(pts, { color: "blue", weight: 6 }).addTo(map);
    map.fitBounds(pts);
}

async function findFastestRoute() {
    let sA = document.getElementById("startAddress").value;
    let eA = document.getElementById("endAddress").value;

    let s = await geocode(sA);
    let e = await geocode(eA);
    if (!s || !e) return alert("Invalid addresses.");

    let graph = await loadGraph();

    let sN = graph.closestNode(s);
    let eN = graph.closestNode(e);

    let path = astar(graph, sN, eN);
    let pts = path.map(n => graph.coords[n]);

    L.polyline(pts, { color: "orange", weight: 6 }).addTo(map);
    map.fitBounds(pts);
}

async function evacuateToSafeZone() {
    let startAddr = document.getElementById("startAddress").value;
    let s = await geocode(startAddr);
    if (!s) return alert("Invalid address.");

    let nearest = safeZones.reduce((a, b) =>
        (L.latLng(s).distanceTo(a.coords) < L.latLng(s).distanceTo(b.coords)) ? a : b
    );

    document.getElementById("endAddress").value =
        nearest.coords[0] + ", " + nearest.coords[1];

    findSafestRoute();
}
