const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);
router.get('/myInfo', userController.getMyInfo);
router.put('/updatePassenger', userController.updatePassenger);
router.put('/updateDriver', userController.updateDriver);
router.post('/rating', userController.updateRating);
module.exports = router;
    