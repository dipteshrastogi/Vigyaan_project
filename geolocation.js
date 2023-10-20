function getLocationWithGeolocationAPI() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Send latitude and longitude data to the receiver endpoint
        sendDataToReceiver(latitude, longitude);

        // Update UI with location info
        const locationInfo = `Location (Geolocation API): Latitude: ${latitude}, Longitude: ${longitude}`;
        document.getElementById("location-info").textContent = locationInfo;
    }, function(error) {
        // If Geolocation API fails, fall back to IP address-based location retrieval
        getLocationWithIPAddress();
    });
}

function sendDataToReceiver(latitude, longitude) {
    fetch("http://localhost:3000/receive-location", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Receiver response:", data);
        // Assuming the response contains any necessary acknowledgments or data
    })
    .catch(error => {
        console.error("Error sending data to receiver:", error);
    });
}

// Check if Geolocation API is supported
if ("geolocation" in navigator) {
    // If supported, use Geolocation API to retrieve location
    document.getElementById("getLocationButton").addEventListener("click", getLocationWithGeolocationAPI);
} else {
    // If not supported, fall back to IP address-based location retrieval
    document.getElementById("getLocationButton").addEventListener("click", getLocationWithIPAddress);
}
