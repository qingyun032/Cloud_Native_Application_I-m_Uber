const routeService = require('../services/routeService');
const boardingService = require('../services/boardingService');
const distanceCalculator = require('../utils/distance');
const stopService = require('../services/stopService');
  
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
    // loop through all stops to find the distance between each stop
    // calculate the time between each stop


    const routeData = req.body;
    // I need frontend to send:
    // 1. startTime
    // 2. A list of stopIds
    // 3. available: available seats
    // 4. type: GO or BACK
    // 5. state: PROCESSING or CONFIRMED
  
    try {
      // create route
      routeInfo = {}
      routeData.stopIds = routeData.stopIds.sort();
      if (routeData.type == "GO") {
        routeInfo.start = routeData.stopIds[0];
        routeInfo.destination = routeData.stopIds[routeData.stopIds.length - 1];
      } else {
        routeInfo.start = routeData.stopIds[routeData.stopIds.length - 1];
        routeInfo.destination = routeData.stopIds[0];
      }
      routeInfo.driverId = driverId;
      routeInfo.startTime = routeData.startTime;
      routeInfo.available = routeData.available;
      routeInfo.type = routeData.type;
      routeInfo.state = routeData.state;

      const route = await routeService.createRoute(routeInfo);

      // create boardings
      const total_distance = 0;
      const arriveTime = routeData.startTime;
      for (let i = 0; i < routeData.stopIds.length; i++) {
        const stop = stopService.getStopById(routeData.stopIds[i]);
        if (i < routeData.stopIds.length - 1) {
          const nextStopId = stopService.getStopById(routeData.stopIds[i + 1]);
          const distance = distanceCalculator(stop.latitude, stop.longtitude, nextStopId.latitude, nextStopId.longtitude);
          total_distance += distance;
        }
        
        const boarding = {
          routeId: route.routeID,
          stopId: routeData.stopIds[i],
          boardTime: arriveTime
        }
        
        await boardingService.createBoarding(boarding);
        if (i < routeData.stopIds.length - 1) {
          arriveTime = routeData.startTime + distance / 40; // 40 km/h
        }
      }

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