const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps');

//To be replaced by queries
const fakeMaps = [
  { id: 1, title: 'Map 1', description: 'Description of Map 1', user_id: 1, coordinates: [34.0522, -118.2437] },
  { id: 2, title: 'Map 2', description: 'Description of Map 2', user_id: 2, coordinates: [40.7128, -74.0060] },
  { id: 3, title: 'Map 3', description: 'Description of Map 3', user_id: 1, coordinates: [51.5074, -0.1278] },
];

//Use user cookie to display all maps, user's favourites and maps they've contributed to.
router.get('/', (req, res) => {
	// mapQueries.fetchAllMaps()
	// .then(maps => {
		return res.render('maps', { maps: fakeMaps });
	})
// 	// .catch(err => {
// 		console.error(err);
// 	});
// })

// router.post('/', (req, res) => {
// 	const { title, description } = req.body;

// 	mapQueries.newMap(title, description, url)
// 		.then(() => {
			
// 		})

// })

module.exports = router;
