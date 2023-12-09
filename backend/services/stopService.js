const sequelize = require('../config/database');
const Stop = require('../db/models/Stops');
const addressToLatLon = require('../utils/transformAddr')
const calculateDistance = require('../utils/calculateDistance')

const getAllStops = async () => {
    return Stop.findAll();
};

const getStopById = async (id) => {
    return Stop.findByPk(id);
};

const getNearestNStops = async (address, nStops, limitDistance) => {
    const { lat, long } = await addressToLatLon(address);
    // the distance as L2 norm in ascending order
    try {
        const stops = await Stop.findAll();

        const stopWithDistance = stops.map((stop) => {
            const distance = calculateDistance(lat, long, stop.latitude, stop.longtitude);
            return {
                ...stop.get(), // ...: spread operator for a shall
                distance: distance
            }
        })
        const filteredStops = stopWithDistance.filter((stop) => stop.distance <= limitDistance);
        const sortedStops = filteredStops.sort((a, b) => a.distance - b.distance).slice(0, nStops);
        return sortedStops
    } catch (error) {
        throw new Error('An error occurred while acquiring the nearest stop');
    }
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
