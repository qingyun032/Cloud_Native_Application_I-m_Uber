const Route = require('../db/models/Routes');

const getAllRoutes = async () => {
    return Route.findAll();
};

const getRouteById = async (id) => {
    return Route.findByPk(id);
};

const createRoute = async (routeData) => {
    return Route.create(routeData);
};

const updateRoute = async (id, routeData) => {
    return Route.update(routeData, {
        where: { id: id }
    });
};

const deleteRoute = async (id) => {
    return Route.destroy({
        where: { id: id }
    });
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute
};