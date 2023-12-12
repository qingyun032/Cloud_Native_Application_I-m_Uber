const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Create a new route
router.post('/createRoute', routeController.createRoute);
router.get('/showStops', routeController.showStops);
router.post('/confirmRoute', routeController.confirmRoute);
module.exports = router;
