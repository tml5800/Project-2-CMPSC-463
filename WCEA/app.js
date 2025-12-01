// --------------------------------------------------
// Initialize Philadelphia Map
// --------------------------------------------------
var map = L.map('map').setView([39.9526, -75.1652], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


// --------------------------------------------------
// ADD DANGER ZONES (Red Circles)
// --------------------------------------------------
var dangerZones = [
    {
        name: "Flood Zone",
        coords: [39.950, -75.180],
        radius: 1200
    },
    {
        name: "Storm Impact Area",
        coords: [39.965, -75.150],
        radius: 1000
    }
];

dangerZones.forEach(zone => {
    L.circle(zone.coords, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.4,
        radius: zone.radius
    }).addTo(map)
      .bindPopup("⚠ Danger Zone: " + zone.name);
});


// --------------------------------------------------
// ADD SAFE ZONES (Green Circles)
// --------------------------------------------------
var safeZones = [
    { name: "Safe Shelter - South Philly", coords: [39.930, -75.160], radius: 500 },
    { name: "Safe Shelter - North Philly", coords: [39.990, -75.150], radius: 500 }
];

safeZones.forEach(zone => {
    L.circle(zone.coords, {
        color: "green",
        fillColor: "green",
        fillOpacity: 0.3,
        radius: zone.radius
    }).addTo(map)
      .bindPopup("🟢 Safe Zone: " + zone.name);
});


// --------------------------------------------------
// Geocoding Function (Converts address → lat/lng)
// --------------------------------------------------
async function geocode(address) {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + " Philadelphia")}`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.length === 0) {
        alert("Address not found: " + address);
        return null;
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}


// --------------------------------------------------
// Draw Route Between Two Points
// (Simple straight line for demonstration; can upgrade later)
// --------------------------------------------------
function drawRoute(start, end) {
    L.polyline([start, end], { color: "blue", weight: 5 }).addTo(map);
}


// --------------------------------------------------
// Main Function: convert both addresses → find route
// --------------------------------------------------
async function geocodeAndRoute() {
    let startAddress = document.getElementById("startAddress").value;
    let endAddress = document.getElementById("endAddress").value;

    if (!startAddress || !endAddress) {
        alert("Please enter both addresses.");
        return;
    }

    let startCoords = await geocode(startAddress);
    let endCoords = await geocode(endAddress);

    if (!startCoords || !endCoords) return;

    // Add markers
    L.marker(startCoords).addTo(map).bindPopup("Start Here").openPopup();
    L.marker(endCoords).addTo(map).bindPopup("Destination");

    // Draw route
    drawRoute(startCoords, endCoords);

    // Center map
    map.fitBounds([startCoords, endCoords]);
}
