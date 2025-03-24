function initMap() {

     // Hide the More Details link initially
     document.getElementById("more-details").style.display = "none";
     document.getElementById("directions-link").style.display = "none";
     document.getElementById("facilities-container").style.display = "none"; 


    const parks = {
        "1": { name: "Algonquin Provincial Park", lat: 45.8372, lng: -78.3790, description: "Known for its wildlife and canoe routes.", image: "algonquin.jpg", facilities: ["🚻", "🏕️", "🚶"] },
        "2": { name: "Bon Echo Provincial Park", lat: 44.8923, lng: -77.1935, description: "Famous for Mazinaw Rock with Indigenous pictographs.", image: "bonnecho.jpg", facilities: ["🚻", "🔥", "🚣"] },
        "3": { name: "Killarney Provincial Park", lat: 46.0058, lng: -81.3957, description: "Known for its stunning landscapes and hiking trails.", image: "killarney.jpg", facilities: ["🚻", "🏞️", "🛶"] },
        "4": { name: "Pinery Provincial Park", lat: 43.2692, lng: -81.8110, description: "Located along Lake Huron with sandy beaches.", image: "pinery.jpg", facilities: ["🚻", "🏖️", "🚴"] },
        "5": { name: "Killbear Provincial Park", lat: 45.3715, lng: -80.2132, description: "Known for its beaches and Georgian Bay views.", image: "killbear.jpg", facilities: ["🚻", "⛺", "🏊"] },
        "6": { name: "Bruce Peninsula National Park", lat: 45.2298, lng: -81.5250, description: "Famous for its cliffs and crystal-clear waters.", image: "brucepeninsula.jpg", facilities: ["🚻", "🏞️", "🐾"] },
        "7": { name: "Sleeping Giant Provincial Park", lat: 48.2425, lng: -88.8183, description: "Offers hiking trails with stunning views over Thunder Bay.", image: "sleepinggiant.jpg", facilities: ["🚻", "⛰️", "🚶"] }
    };

    const parkDirectionsLinks = {
        "1": "https://www.google.com/maps/dir/?api=1&destination=45.8372,-78.3790",
        "2": "https://www.google.com/maps/dir/?api=1&destination=44.8923,-77.1935",
        "3": "https://www.google.com/maps/dir/?api=1&destination=46.0058,-81.3957",
        "4": "https://www.google.com/maps/dir/?api=1&destination=43.2692,-81.8110",
        "5": "https://www.google.com/maps/dir/?api=1&destination=45.3715,-80.2132",
        "6": "https://www.google.com/maps/dir/?api=1&destination=45.2298,-81.5250",
        "7": "https://www.google.com/maps/dir/?api=1&destination=48.2425,-88.8183"
    };

    const defaultLocation = { lat: 50.0000, lng: -85.0000 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 5,
    });

    let marker = new google.maps.Marker({ map, visible: false });

    document.getElementById("park-select").addEventListener("change", function () {
        document.getElementById("loading").style.display = "block";
        setTimeout(() => {
            const parkId = this.value;
            if (!parkId) {
                map.setCenter(defaultLocation);
                map.setZoom(5);
            
                marker.setVisible(false);
            
                // Hide the More Details link if no park is selected
                document.getElementById("selected-park-name").textContent = "";
                document.getElementById("selected-park-description").textContent = "";
                document.getElementById("more-details").style.display = "none";
                document.getElementById("directions-link").style.display = "none";
                document.getElementById("facilities-container").style.display = "none";
                
                document.getElementById("loading").style.display = "none";
                return;
            }

            const park = parks[parkId];
            map.setCenter({ lat: park.lat, lng: park.lng });
            map.setZoom(8);
            marker.setPosition({ lat: park.lat, lng: park.lng });
            marker.setVisible(true);

            document.getElementById("selected-park-name").textContent = park.name;
            document.getElementById("selected-park-description").textContent = park.description;
            document.getElementById("more-details").href = `https://www.google.com/search?q=${encodeURIComponent(park.name)}`;
            document.getElementById("more-details").style.display = "inline-block";

            
            document.getElementById("directions-button").href = parkDirectionsLinks[parkId];
            document.getElementById("directions-link").style.display = "block";

            // Facilities
            const facilitiesContainer = document.getElementById("facilities-container");
            const facilitiesList = document.getElementById("facilities-list");
            facilitiesContainer.innerHTML = park.facilities.map(facility => `<span class='facility-icon'>${facility}</span>`).join(" ");
            facilitiesContainer.style.display = "block";

            document.getElementById("loading").style.display = "none";
        }, 500);
    });
}

