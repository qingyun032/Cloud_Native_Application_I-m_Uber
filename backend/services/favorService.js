const Favor = require('../db/models/Favor');
const Users = require('../db/models/Users');

async function getAllFavors() {
    try {
        const favors = await Favor.findAll({
            include: [
                Users
            ]
        });
        return favors;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favors');
    }
}

async function getFavorByUserId(userId) {
    try {
        const favor = await Favor.findByPk(userId, {
            include: [
                Users
            ]
        });
        if (!favor) {
            throw new Error('Favor not found');
        }
        return favor;
    } catch (error) {
        throw new Error('An error occurred while acquiring the favor');
    }
}

async function createFavor(favorData) {
    try {
        const favor = await Favor.create(favorData);
        return favor;
    } catch (error) {
        throw new Error('An error occurred while creating the favor');
    }
}

async function updateFavor(userId, favorData) {
    try {
        const favor = await Favor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        favor.set(favorData);
        await favor.save();
        return favor;
    } catch (error) {
        throw new Error('An error occurred while updating the favor');
    }
}

async function deleteFavor(userId) {
    try {
        const favor = await Favor.findByPk(userId);
        if (!favor) {
            throw new Error('Favor not found');
        }
        await favor.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the favor');
    }
}

module.exports = {
    getAllFavors,
    getFavorByUserId,
    createFavor,
    updateFavor,
    deleteFavor
};
