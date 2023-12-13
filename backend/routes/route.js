const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Create a new route
router.post('/createRoute', routeController.createRoute);

// Show stops for driver to choose
router.get('/showStops', routeController.showStops);

// Confirm route when 
router.post('/confirmRoute', routeController.confirmRoute);

// Show boarding information to driver
router.get('/showBoardingInfo', routeController.showBoardingInfo);

module.exports = router;
