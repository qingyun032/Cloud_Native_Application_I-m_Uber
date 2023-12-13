const routeService = require('../services/routeService');
const boardingService = require('../services/boardingService');
const distanceCalculator = require('../utils/distance');
const stopService = require('../services/stopService');
const coordinate2grid = require('../utils/coordinate2grid');
const transformAddr = require('../utils/transformAddr');
const gridService = require('../services/gridService');
const passengerService = require('../services/passengerService');

const getAllRoutes = async (req, res) => {
  try {
    // grid
    const stops = await routeService.getAllRoutes();
    res.status(200).json(stops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
  
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
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    // I need frontend to send:
    // 1. startTime
    // 2. A list of stopIds
    // 3. available: available seats
    // 4. type: GO or BACK
    // 5. state: PROCESSING or CONFIRMED
    const routeData = req.body; 
    const routeInfo = {'driverID': driverId};

    try {
      // create route
      var route = {};
      // routeData.stopIds = routeData.stopIds.sort();
      if (routeData.stopIds.length < 3) {
        res.status(400).json({ error: "You should include at least 1 intermediate stop" });
        return;
      } else {
        if (routeData.type == "GO") {
          routeInfo.start = routeData.stopIds[0];
          routeInfo.destination = routeData.stopIds[routeData.stopIds.length - 1];
        } else {
          routeInfo.start = routeData.stopIds[routeData.stopIds.length - 1];
          routeInfo.destination = routeData.stopIds[0];
        }
        
        routeInfo.startTime = routeData.startTime;
        routeInfo.available = routeData.available;
        routeInfo.type = routeData.type;
        routeInfo.state = routeData.state;
        // console.log(routeInfo);
  
        route = await routeService.createRoute(routeInfo);
  
        // create boardings
        var total_distance = 0;
        var arriveTime = new Date(routeData.startTime);
        var boardingInfo = {'routeID': route.routeID}; // when create a 
        // for loop to create each boarding
        for (let i = 0; i < routeData.stopIds.length; i++) {
          const stop = await stopService.getStopById(routeData.stopIds[i]);
          
          boardingInfo.stopID = routeData.stopIds[i];
          boardingInfo.boardTime = arriveTime;
          
          // await can make sure that the boarding is created before the next iteration
          await boardingService.createBoarding(boardingInfo);

          if (i < routeData.stopIds.length - 1) {
            const nextStopId = await stopService.getStopById(routeData.stopIds[i + 1]);
            const distance = await distanceCalculator(stop.latitude, stop.longitude, nextStopId.latitude, nextStopId.longitude);
            total_distance += distance;
            var intervalTime = new Date((distance / 40) * 60 * 60 * 1000); // 40 km/h

            arriveTime = new Date(arriveTime.getTime() + intervalTime.getTime());
          }
        }
      }

      res.status(201).json(route);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

const confirmRoute = async (req, res) => {
  const driverId = req.session.userId;
  if(!driverId){
      res.status(401).json({ error: "Wrong sign in information"})
      return;
  }
  try{
    let routeInfo = await routeService.getAllRoutes();
    routeInfo = routeInfo.filter(
      route => 
      route.driverID === driverId
    );
    routeInfo = routeInfo[0]
    
    let modifyInfo = {
      state: "CONFIRMED"
    }
    let updaterouteInfo = routeService.updateRoute(routeInfo.routeID, modifyInfo);
    res.status(200).json({ message: "Comfirm Route Successfully!" });
  } catch (error){
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

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

const showStops = async (req, res) => {
    const isGo = req.query.isGo;
    const address = req.query.address;
    const position = await transformAddr(address);
    const gridID = coordinate2grid(position['lat'], position['lon']);
    try {
        const stops = await gridService.pathOriginatedFromGrid(gridID, isGo);
        res.status(200).json({ "Stops": stops });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showBoardingInfo = async (req, res) => {
  const driverId = req.session.userId;
  if(!driverId){
      res.status(401).json({ error: "Wrong sign in information"})
      return;
  }
  try{
    let routeInfo = await routeService.getAllRoutes();
    routeInfo = routeInfo.filter(
      route => 
      route.driverID === driverId
    );
    console.log(`route nums: ${routeInfo.length}`);
    routeInfo = routeInfo[0]
    
    let boardings = await boardingService.getAllBoardings();
    boardings = boardings.filter(
      boarding => 
      boarding.routeID === routeInfo.routeID
    );

    // Get the passengers in the routes
    let passengers = await passengerService.getAllPassengers();
    passengers = passengers.filter(
      passnger =>
      passnger.routeID === routeInfo.routeID
    );
    // Get the boardings in the routes
    let boardingInfo = {"stops": []};
    for (let i = 0; i < boardings.length; i++) {
      const stop = await stopService.getStopById(boardings[i].stopID);
      let stopInfo = {}
      stopInfo.stopID = stop.stopID;
      stopInfo.name = stop.name;
      stopInfo.address = stop.address;
      stopInfo.boardTime = boardings[i].boardTime;
      stopInfo.latitude = stop.latitude;
      stopInfo.longitude = stop.longitude;

      stopInfo.passengers = [];
      for (let j = 0; j < passengers.length; j++) {
        let passengerInfo = {};
        if (passengers[j].pickUpStopID === stop.stopID) {
          passengerInfo.name = passengers[j].name;
          passengerInfo.count = passengers[j].passengerCnt;
          passengerInfo.type = "pickUp";
          stopInfo.passengers.push(passengerInfo);
        } else if (passengers[j].dropOFFStopID === stop.stopID) {
          passengerInfo.name = passengers[j].name;
          passengerInfo.count = passengers[j].passengerCnt;
          passengerInfo.type = "dropOff";
          stopInfo.passengers.push(passengerInfo);
        }
      }
      boardingInfo.stops.push(stopInfo);
    }

    res.status(200).json({boardingInfo});
  } catch (error){
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    confirmRoute,
    updateRoute,
    deleteRoute,
    showStops, 
    showBoardingInfo
};