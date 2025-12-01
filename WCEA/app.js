// --------------------------------------------------
// Initialize Philadelphia Map
// --------------------------------------------------
var map = L.map('map').setView([39.9526, -75.1652], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


// --------------------------------------------------
// Add Danger Zones (RED CIRCLES)
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
// Safe Zones (GREEN CIRCLES)
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
// Geocoder (Nominatim)
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
// Load graph
// --------------------------------------------------
async function loadGraph() {
    let data = await fetch('data/philly_graph.json').then(r => r.json());
    return new Graph(data);
}


// --------------------------------------------------
// Route through graph using Dijkstra
// --------------------------------------------------
async function routeThroughGraph(startCoords, endCoords) {
    let graph = await loadGraph();

    let startNode = graph.closestNode(startCoords);
    let endNode = graph.closestNode(endCoords);

    let path = dijkstra(graph, startNode, endNode);

    let latlngs = path.map(n => graph.coords[n]);

    L.polyline(latlngs, { color: "blue", weight: 5 }).addTo(map);
    map.fitBounds(latlngs);
}


// --------------------------------------------------
// Main Function
// --------------------------------------------------
async function geocodeAndRoute() {
    let startAddress = document.getElementById("startAddress").value;
    let endAddress = document.getElementById("endAddress").value;

    if (!startAddress || !endAddress) {
        alert("Enter both addresses");
        return;
    }

    let startCoords = await geocode(startAddress);
    let endCoords = await geocode(endAddress);

    if (!startCoords || !endCoords) return;

    L.marker(startCoords).addTo(map).bindPopup("Start").openPopup();
    L.marker(endCoords).addTo(map).bindPopup("Destination");

    routeThroughGraph(startCoords, endCoords);
}
