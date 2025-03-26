const express = require('express');
const axios = require('axios');
const cors = require('cors');

const router = express.Router();

// ✅ Allow CORS on this specific route
router.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Reverse geocoding route
router.get('/reverse', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        zoom: 18,
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'YourAppName/1.0' // ✅ Allowed in backend
      }
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.json(response.data);
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
});

module.exports = router;
