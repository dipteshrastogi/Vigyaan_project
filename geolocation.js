function getLocationWithGeolocationAPI() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update UI with location info
        const locationInfo = `Location (Geolocation API): Latitude: ${latitude}, Longitude: ${longitude}`;
        document.getElementById("location-info").textContent = locationInfo;

        // Send latitude and longitude data to the server
        fetch('/send-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
        });
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