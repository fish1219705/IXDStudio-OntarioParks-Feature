function initMap() {
    const parks = {
        "1": { name: "Algonquin Provincial Park", lat: 45.8372, lng: -78.3790, description: "Known for its wildlife and canoe routes.", image: "algonquin.jpg" },
        "2": { name: "Bon Echo Provincial Park", lat: 44.8923, lng: -77.1935, description: "Famous for Mazinaw Rock with Indigenous pictographs.", image: "bonnecho.jpg" },
        "3": { name: "Killarney Provincial Park", lat: 46.0058, lng: -81.3957, description: "Known for its stunning landscapes and hiking trails.", image: "killarney.jpg" },
        "4": { name: "Pinery Provincial Park", lat: 43.2692, lng: -81.8110, description: "Located along Lake Huron with sandy beaches.", image: "pinery.jpg" },
        "5": { name: "Killbear Provincial Park", lat: 45.3715, lng: -80.2132, description: "Known for its beaches and Georgian Bay views.", image: "killbear.jpg" },
        "6": { name: "Bruce Peninsula National Park", lat: 45.2298, lng: -81.5250, description: "Famous for its cliffs and crystal-clear waters.", image: "brucepeninsula.jpg" },
        "7": { name: "Sleeping Giant Provincial Park", lat: 48.2425, lng: -88.8183, description: "Offers hiking trails with stunning views over Thunder Bay.", image: "sleepinggiant.jpg" }
    };

    const defaultLocation = { lat: 50.0000, lng: -85.0000 }; // Default: Center of Ontario
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 5,
    });

    let marker = new google.maps.Marker({ map, visible: false });

    document.getElementById("park-select").addEventListener("change", function () {
        document.getElementById("loading").style.display = "block"; // Show loading indicator
        setTimeout(() => {
            const parkId = this.value;
            if (!parkId) return;

            const park = parks[parkId];
            map.setCenter({ lat: park.lat, lng: park.lng });
            map.setZoom(8);

            marker.setPosition({ lat: park.lat, lng: park.lng });
            marker.setVisible(true);

            // Update details
            document.getElementById("place-name").textContent = park.name;
            document.getElementById("place-coordinates").textContent = `${park.lat.toFixed(6)}, ${park.lng.toFixed(6)}`;
            document.getElementById("place-description").textContent = park.description;

            // Update park image
            document.getElementById("park-image").src = park.image;

            // Update directions link
            const parkDirectionsLinks = {
                "1": "https://www.google.com/maps/dir/?api=1&destination=45.8372,-78.3790",
                "2": "https://www.google.com/maps/dir/?api=1&destination=44.8923,-77.1935",
                "3": "https://www.google.com/maps/dir/?api=1&destination=46.0058,-81.3957",
                "4": "https://www.google.com/maps/dir/?api=1&destination=43.2692,-81.8110",
                "5": "https://www.google.com/maps/dir/?api=1&destination=45.3715,-80.2132",
                "6": "https://www.google.com/maps/dir/?api=1&destination=45.2298,-81.5250",
                "7": "https://www.google.com/maps/dir/?api=1&destination=48.2425,-88.8183"
            };
            document.getElementById("directions-button").href = parkDirectionsLinks[parkId];

            document.getElementById("loading").style.display = "none"; // Hide loading indicator
        }, 500); // Simulate a delay
    });
}
