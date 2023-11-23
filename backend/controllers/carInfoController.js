const carInfoService = require('../services/carInfoService');

const getAllCarInfo = async (req, res) => {
  try {
    const carInfos = await carInfoService.getAllCarInfo();
    res.status(200).json(carInfos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCarInfoById = async (req, res) => {
  const carInfoId = req.params.id;

  try {
    const carInfo = await carInfoService.getCarInfoById(carInfoId);
    res.status(200).json(carInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createCarInfo = async (req, res) => {
  const carInfoData = req.body;

  try {
    const carInfo = await carInfoService.createCarInfo(carInfoData);
    res.status(201).json(carInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateCarInfo = async (req, res) => {
  const carInfoId = req.params.id;
  const carInfoData = req.body;

  try {
    const carInfo = await carInfoService.updateCarInfo(carInfoId, carInfoData);
    res.status(200).json(carInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCarInfo = async (req, res) => {
  const carInfoId = req.params.id;

  try {
    await carInfoService.deleteCarInfo(carInfoId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCarInfo,
  getCarInfoById,
  createCarInfo,
  updateCarInfo,
  deleteCarInfo
};
