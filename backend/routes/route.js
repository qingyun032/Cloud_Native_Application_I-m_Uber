const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Create a new route
router.post('/createRoute', routeController.createRoute);

module.exports = router;