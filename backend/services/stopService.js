const sequelize = require('../config/database');
const Stop = require('../db/models/Stops');

const getAllStops = async () => {
    return Stop.findAll();
};

const getStopById = async (id) => {
    return Stop.findByPk(id);
};

const getNearestNStops = async (lat, long, nStops, distance) => {
    // the distance as L2 norm in ascending order
    return Stop.findAll({
        limit: nStops,
        attributes: [
            '*',
            [
                sequelize.literal(
                    `
                    6371 * 2 * ASIN(SQRT(POW(SIN((RADIANS(${lat}) - RADIANS(latitude)) / 2), 2) + \
                    COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * POW(SIN((RADIANS(${long}) - RADIANS(longtitude)) / 2), 2)))
                    `
                ),
                'distance'
            ]
        ],
        having: sequelize.literal(`distance < ${distance}`),
        order: sequelize.literal('distance') // Default: ascending order
    });
}

const createStop = async (stopData) => {
    return Stop.create(stopData);
};

const updateStop = async (id, stopData) => {
    return Stop.update(stopData, {
        where: { id: id }
    });
};

const deleteStop = async (id) => {
    return Stop.destroy({
        where: { id: id }
    });
};

module.exports = {
    getAllStops,
    getStopById,
    getNearestNStops,
    createStop,
    updateStop,
    deleteStop
};
