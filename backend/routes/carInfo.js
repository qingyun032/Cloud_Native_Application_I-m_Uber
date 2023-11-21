const express = require('express');
const router = express.Router();
const carInfoController = require('../controllers/carInfoController');


router.get('/', carInfoController.getAllCarInfo);
router.get('/:id', carInfoController.getCarInfoById);
router.post('/', carInfoController.createCarInfo);
router.put('/:id', carInfoController.updateCarInfo);
router.delete('/:id', carInfoController.deleteCarInfo);

module.exports = router;
