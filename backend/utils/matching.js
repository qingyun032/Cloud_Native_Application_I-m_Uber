const stopService = require('../services/stopService');
const routesService = require('../services/routesService');
const boardingService = require('../services/boardingService');
const userService = require('../services/userService');
const carInfoService = require('../services/carInfoService');
const { calculateDistance } = require('./distance');
const { calculatePrice } = require('./pricing');

/**
 * Matches routes based on given criteria.
 *
 * @param {number} lat - The latitude of the current location.
 * @param {number} long - The longitude of the current location.
 * @param {number} FixStopID - The ID of the fixed stop.
 * @param {string} direction - The direction of the route ('work' or 'home').
 * @param {Date} board_time - The boarding time filter.
 * @param {number} passenger_cnt - The amount of passenger of this order.
 * @returns {Promise<Array<Object>>} - An array of matched routes with relevant information.
 */
async function Routes_matching(lat, long, FixStopID, direction, board_time, passenger_cnt) {
  const Fixstop = await Stops.getStopById(FixStopID);
  let routes = await routesService.getAllRoutes();

  if (direction === 'work') {
    routes = routes.filter(route => route.direction === direction && route.destination === FixStopID);
  } else if (direction === 'home') {
    routes = routes.filter(route => route.direction === direction && route.start === FixStopID);
  }

  const return_routes = [];
  const nearNstops = await stopService.getNearestNStops(lat, long, 3, 2);
  const boardings = await boardingService.findAllBoardings();

  for (const route of routes) {
    let find = 0;
    if(route.available - passenger_cnt < 0) continue
    for (const boarding of boardings) {
      const stop = await stopService.getStopById(boarding.stopID);

      if (
        find === 0 &&
        boarding.routeID === route.routeID &&
        boarding.boardTime > board_time &&
        nearNstops.includes(stop)
      ) {
        find = 1;

        const user = await userService.getUserById(route.userID);
        const carInfo = await carInfoService.getCarInfoById(user.carPlate);
        const distance = await calculateDistance(
          stop.latitude,
          stop.longitude,
          Fixstop.latitude,
          Fixstop.longitude
        );

        const rating = user.ratingTotalScore / user.nRating;

        const price = calculatePrice(distance, carInfo.type, rating, carInfo.electric);

        const temp_dic = {
          routeID: route.userID,
          stopID: stop.stopID,
          driverID: user.userID,
          rating: rating,
          nRating: user.nRating,
          price: price,
          carPlate: carInfo.carPlate,
          cartype: carInfo.type,
          carbrand: carInfo.brand,
          carColor: carInfo.color,
          carelectric: carInfo.electric
        };

        return_routes.push(temp_dic);
      }
    }
  }

  return return_routes;
}

module.exports = { Routes_matching };
