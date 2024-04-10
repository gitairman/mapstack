const express = require('express');
const router = express.Router();

const fakeMaps = [
  { id: 1, title: 'Map 1', description: 'Description of Map 1', coordinates: [37.7749, -122.4194] },
  { id: 2, title: 'Map 2', description: 'Description of Map 2', coordinates: [34.0522, -118.2437] },
  // Add more fake maps as needed
];

router.get('/', (req, res) => {
	res.render(fakeMaps)
})

module.exports = router;