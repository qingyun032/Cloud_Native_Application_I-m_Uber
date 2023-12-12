const stopService = require('../services/stopService');
const routesService = require('../services/routeService');
const boardingService = require('../services/boardingService');
const userService = require('../services/userService');
const carInfoService = require('../services/carInfoService');
const calculateDistance = require('./distance');
const calculatePrice = require('./pricing');

/**
 * Matches routes based on given criteria.
 *
 * @param {string} address - The address of the current location.
 * @param {number} FixStopID - The ID of the fixed stop.
 * @param {string} direction - The direction of the route ('work' or 'home').
 * @param {Date} board_time - The boarding time filter.
 * @param {number} passenger_cnt - The amount of passenger of this order.
 * @returns {Promise<Array<Object>>} - An array of matched routes with relevant information.
 */
const Routes_matching = async(address, FixStopID, direction, board_time, passenger_cnt) => {
  try{
    // console.log("In function")
    // console.log(FixStopID)
    const p_board_time = new Date(board_time)
    const Fixstop = await stopService.getStopById(FixStopID);
    let routes = await routesService.getAllRoutes();
    
    if (direction === true) {
      routes = routes.filter(route => route.type === "GO" && route.destination === FixStopID);
    } else if (direction === false) {
      routes = routes.filter(route => route.type === "BACK" && route.start === FixStopID);
    }
    // console.log(address)
    // console.log(routes)

    let Routes = [];
    // const return_routes = {"Routes": []};
    const nearNstops = await stopService.getNearestNStops(address, 3, 2);
    const boardings = await boardingService.getAllBoardings();
    const filteredboardings = boardings.filter(boarding => nearNstops.some(nearStop => nearStop.stopID === boarding.stopID));

    for (const route of routes) {
      let find = 0;
      if(route.state == 'CONFIRMED') continue
      if(route.available - passenger_cnt < 0) continue
      for (const boarding of filteredboardings) {
        const stop = await stopService.getStopById(boarding.stopID);
        if (
          find === 0 &&
          boarding.routeID === route.routeID &&
          boarding.boardTime > p_board_time
        ) {
          find = 1;
          const user = await userService.getUserById(route.driverID);
          const distance = await calculateDistance(
            stop.latitude,
            stop.longitude,
            Fixstop.latitude,
            Fixstop.longitude
          );
          let rating = 0;
          if(user.nRating !== 0){
            rating = user.ratingTotalScore / user.nRating;
          }
          const price = await calculatePrice(distance, user.CarInfo.brand, user.CarInfo.type, rating, user.CarInfo.electric);
          const temp_dic = {
            routeID: route.routeID,
            stopID: stop.stopID,
            stopAddress: stop.address,
            stop_lat: parseFloat(stop.latitude),
            stop_lon: parseFloat(stop.longitude),
            driverID: user.userID,
            driverName: user.userName,
            board_time: boarding.boardTime,
            rating: rating,
            nRating: user.nRating,
            price: price,
            carPlate: user.CarInfo.carPlate,
            cartype: user.CarInfo.type,
            carbrand: user.CarInfo.brand,
            carColor: user.CarInfo.color,
            carelectric: user.CarInfo.electric
          };
          Routes.push(temp_dic);
          // return_routes.Routes.push(temp_dic);
        }
      }
    }
    // console.log(return_routes);
    // return return_routes;
    // console.log(Routes)
    return Routes;
  } catch(error) {
    return null;
  }
}

module.exports = Routes_matching;
