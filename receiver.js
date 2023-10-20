const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/receive-location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log('Received location data - Latitude:', latitude, 'Longitude:', longitude);
    // Process the received latitude and longitude data here

    // Assuming you want to send the same data to server.js
    sendDataToServer(latitude, longitude);

    // Send a response to acknowledge the receipt of location data
    res.status(200).json({ message: 'Location data received and forwarded successfully' });
});

const serverPort = 3001; // Change the port to avoid conflicts with the frontend
app.listen(serverPort, () => {
    console.log(`Receiver listening on port ${serverPort}`);
});

function sendDataToServer(latitude, longitude) {
    const serverURL = 'http://server-system-ip:3000/process-location'; // Replace with the server's IP address
    const data = { latitude, longitude };
    axios.post(serverURL, data)
        .then(response => {
            console.log('Data sent to server successfully');
            console.log('Response from server:', response.data);
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
}
