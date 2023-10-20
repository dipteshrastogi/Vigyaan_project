const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/process-location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log('Received location data on server - Latitude:', latitude, 'Longitude:', longitude);
    // Process the received latitude and longitude data here

    // Send a response to acknowledge the receipt of location data
    res.status(200).json({ message: 'Location data processed successfully' });
});

const serverPort = 3000;
app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});
