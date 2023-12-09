const boarding = require('../db/models/Boarding');

const getAllBoardings = async () => {
    return boarding.findAll();
}

const getBoardingById = async (id) => {
    return boarding.findByPk(id);
}

const createBoarding = async (boardingData) => {
    return boarding.create(boardingData);
}

const updateBoarding = async (id, boardingData) => {
    return boarding.update(boardingData, {
        where: { id: id }
    });
}

const deleteBoarding = async (id) => {
    return boarding.destroy({
        where: { id: id }
    });
}

module.exports = {
    getAllBoardings,
    getBoardingById,
    createBoarding,
    updateBoarding,
    deleteBoarding
};