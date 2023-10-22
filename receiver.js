const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Serve your HTML file and client-side JavaScript
app.use(express.static('public'));

// Add a GET route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint to receive latitude and longitude data
app.post('/send-location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Received latitude: ${latitude}, longitude: ${longitude}`);
    res.send('Location data received successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
