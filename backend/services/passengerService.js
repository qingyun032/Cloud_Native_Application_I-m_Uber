const passenger = require('../db/models/Passenger');

const getAllPassengers = async () => {
    return passenger.findAll();
}

const getPassengerById = async (id) => {
    return passenger.findByPk(id);
}

const createPassenger = async (passengerData) => {
    return passenger.create(passengerData);
}

const updatePassenger = async (id, passengerData) => {
    return passenger.update(passengerData, {
        where: { id: id }
    });
}

const deletePassenger = async (id) => {
    return passenger.destroy({
        where: { id: id }
    });
}

module.exports = {
    getAllPassengers,
    getPassengerById,
    createPassenger,
    updatePassenger,
    deletePassenger
}