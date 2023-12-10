const Favor = require('../db/models/Favor');

const getAllFavors = async () => {
    return Favor.findAll();
}

const getFavorById = async (id) => {
    return Favor.findByPk(id);
}

const createFavor = async (favorData) => {
    return Favor.create(favorData);
}

const updateFavor = async (id, favorData) => {
    return Favor.update(favorData, {
        where: { userID: id }
    });
}

const deleteFavor = async (id) => {
    return Favor.destroy({
        where: { userID: id }
    });
}

module.exports = {
    getAllFavors,
    getFavorById,
    createFavor,
    updateFavor,
    deleteFavor
};
