// --------------------------------------------------
// MAP SETUP
// --------------------------------------------------
var map = L.map('map').setView([39.9526, -75.1652], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


// --------------------------------------------------
// DANGER ZONES
// --------------------------------------------------
let dangerZones = [
    { name: "Flood Zone", coords: [39.950, -75.180], radius: 1200 },
    { name: "Storm Impact", coords: [39.965, -75.150], radius: 1000 }
];

dangerZones.forEach(z => {
    L.circle(z.coords, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.4,
        radius: z.radius
    }).addTo(map).bindPopup("⚠ Danger Zone: " + z.name);
});


// --------------------------------------------------
// SAFE ZONES
// --------------------------------------------------
let safeZones = [
    { name: "Shelter - South Philly", coords: [39.930, -75.160], radius: 600 },
    { name: "Shelter - North Philly", coords: [39.990, -75.150], radius: 600 }
];

safeZones.forEach(z => {
    L.circle(z.coords, {
        color: "green",
        fillColor: "green",
        fillOpacity: 0.3,
        radius: z.radius
    }).addTo(map).bindPopup("🟢 Safe Zone: " + z.name);
});


// --------------------------------------------------
// GEOCODING
// --------------------------------------------------
async function geocode(address) {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + " Philadelphia")}`;

    let res = await fetch(url);
    let data = await res.json();

    if (data.length === 0) {
        alert("Address not found: " + address);
        return null;
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}


// --------------------------------------------------
// LOAD STREET GRAPH
// --------------------------------------------------
async function loadGraph() {
    let g = await fetch("data/philly_graph.json").then(r => r.json());
    return new Graph(g);
}


// --------------------------------------------------
// ROUTING FUNCTION
// --------------------------------------------------
async function routeThroughGraph(startCoords, endCoords) {
    let graph = await loadGraph();

    let startNode = graph.closestNode(startCoords);
    let endNode = graph.closestNode(endCoords);

    let route = dijkstra(graph, startNode, endNode);

    let latlngs = route.map(n => graph.coords[n]);

    L.polyline(latlngs, { color: "blue", weight: 5 }).addTo(map);

    map.fitBounds(latlngs);
}


// --------------------------------------------------
// MAIN FUNCTION
// --------------------------------------------------
async function geocodeAndRoute() {
    let startText = document.getElementById("startAddress").value;
    let endText = document.getElementById("endAddress").value;

    let start = await geocode(startText);
    let end = await geocode(endText);

    if (!start || !end) return;

    L.marker(start).addTo(map).bindPopup("Start");
    L.marker(end).addTo(map).bindPopup("Destination");

    routeThroughGraph(start, end);
}
