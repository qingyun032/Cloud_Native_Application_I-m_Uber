const CarInfo = require('../db/models/CarInfo'); 

const getAllCarInfo = async () => {
  return CarInfo.findAll();
};

const getCarInfoById = async (id) => {
  return CarInfo.findByPk(id);
};

const createCarInfo = async (carInfoData) => {
  return CarInfo.create(carInfoData);
};

const updateCarInfo = async (id, carInfoData) => {
  return CarInfo.update(carInfoData, {
    where: { id: id }
  });
};

const deleteCarInfo = async (id) => {
  return CarInfo.destroy({
    where: { id: id }
  });
};

module.exports = {
  getAllCarInfo,
  getCarInfoById,
  createCarInfo,
  updateCarInfo,
  deleteCarInfo
};
