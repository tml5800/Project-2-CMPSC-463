Project Title: Philadelphia Weather Crisis Evacuation Assistant (WCEA)
Course: CMPSC 463 – Algorithms
Authors: Tommy Lu & Team

🌩️ Philadelphia Weather Crisis Evacuation Assistant (WCEA)

The Weather Crisis Evacuation Assistant is a web-based application designed to help users safely navigate Philadelphia during severe weather emergencies such as floods, storms, or other city-wide hazards.

Using graph algorithms, address geocoding, and interactive maps, the system computes the safest path through the city while displaying danger zones and safe shelter areas.

This project demonstrates how algorithmic thinking, real-world data, and web technologies can be combined to create meaningful and impactful tools for emergency response.

🚀 Features
✅ ✔ Address Search (Geocoding)

Input any Philadelphia address, such as:

“1600 Market St Philadelphia”

“Temple University”

“30th Street Station”

The system converts it into latitude/longitude coordinates automatically.

🔴 ✔ Danger Zones (Red Circles)

Predefined high-risk weather areas such as:

Flood zones

Storm impact areas

Hazardous regions

These appear as red shaded circles on the map.

🟢 ✔ Safe Zones / Shelters (Green Circles)

Low-risk evacuation shelters marked in green, such as:

North Philadelphia Emergency Shelter

South Philadelphia Relief Zone

🧭 ✔ Pathfinding Through City Streets

Unlike simple straight-line routing, this project uses graph-based routing, meaning the route follows actual street intersections and connections.

It uses:

🔹 Dijkstra’s Algorithm

To compute the optimal evacuation path through nodes and edges representing the city’s road network.

🔹 Nearest Node Matching

The system automatically finds the closest street node to both the start and destination addresses.

🗺️ Technologies Used
Frontend

HTML

CSS

JavaScript

Leaflet.js (Interactive mapping)

Routing & Algorithms

Dijkstra’s Algorithm (implemented from scratch)

Custom Graph Data Structure

Priority Queue

Data

Philadelphia street node graph (philly_graph.json)

Danger zone coordinates

Safe zone coordinates

Services

Nominatim Geocoding API (OpenStreetMap)

📂 Project Structure
WCEA/
 ├── index.html
 ├── style.css
 ├── app.js
 ├── /src
 │     ├── graph.js
 │     ├── dijkstra.js
 │     ├── priorityqueue.js
 ├── /data
 │     └── philly_graph.json
 ├── README.md

🏃‍♂️ How to Run the Project (Local Server Required)

Browsers block local files (CORS), so you must run a local server.

1. Open Command Prompt
2. Navigate to the project folder:
cd "C:/Users/tommy/Project 2 cmpsc 463/Project-2-CMPSC-463/WCEA"

3. Start the Python server:
python -m http.server 8000

4. Open your browser and go to:
http://localhost:8000

5. Click index.html

Your full evacuation app will launch.

🧪 How Routing Works

User enters start and destination addresses.

System converts both addresses to coordinates using Nominatim.

Application loads philly_graph.json (street graph).

Finds the closest nodes to start and end points.

Runs Dijkstra's Algorithm to compute safest route.

Draws the route on the map using a blue polyline.

Map zooms to show the entire path.

🧱 Data Files Explained
philly_graph.json

Contains street intersections (nodes) and streets (edges).

Danger zones

Hardcoded in app.js as red circles.

Safe zones

Hardcoded in app.js as green circles.

📌 Future Improvements (Optional)

Hazard avoidance algorithms

A* pathfinding

Live weather data integration

Automatic shelter recommendation

UI redesign

Expand street graph coverage

🏁 Conclusion

The Philadelphia Weather Crisis Evacuation Assistant demonstrates:

Creative application of graph algorithms

Effective use of geospatial mapping

Integration of real-world emergency response concepts

Strong understanding of algorithmic design and web development

This project fulfills the goals of CMPSC 463 by showing how algorithms can solve meaningful real-world problems.