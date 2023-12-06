const routeService = require('../services/routeService');
const boardingService = require('../services/boardingService');
  
const getRouteById = async (req, res) => {
    const routeId = req.params.id;
  
    try {
      const route = await routeService.getRouteById(routeId);
      res.status(200).json(route);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
  
const createRoute = async (req, res) => {
    const driverId = req.session.userId;
    if(!driverId){
        res.status(401).json({ error: "Please sign in before querying driver data"})
        return;
    }
    // TODO
    // create boarding with aboard time calculated

    const routeData = req.body;
  
    try {
      const route = await routeService.createRoute(routeData);
      const boarding = await 

      res.status(201).json(route);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }


};
  
const updateRoute = async (req, res) => {
    const routeId = req.params.id;
    const routeData = req.body;
  
    try {
      const route = await routeService.updateRoute(routeId, routeData);
      res.status(200).json(route);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
  
const deleteRoute = async (req, res) => {
    const routeId = req.params.id;
  
    try {
      await routeService.deleteRoute(routeId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute
};