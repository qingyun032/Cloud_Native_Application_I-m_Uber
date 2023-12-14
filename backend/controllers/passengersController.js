const routeService = require('../services/routeService');
const passengersService = require('../services/passengerService');
const userService = require('../services/userService');
const boardingService = require('../services/boardingService');

const Routes_matching = require('../utils/matching');
// const transformAddr = require('../utils/transformAddr');

async function showCandidates(req, res) {
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    const reqData = req.body; 
    const RetData = {"Routes":[]};
    try {
        // const position = await transformAddr(reqData.address)
        // console.log(position)
        // const routes = await Routes_matching(position.lat, position.lon, 1, reqData.Go, reqData.board_time, reqData.passenger_cnt);
        const routes = await Routes_matching(reqData.address, parseInt(process.env.COMPANY_STOP_ID), reqData.Go, reqData.board_time, reqData.passenger_cnt);
        RetData.Routes = routes;
        req.session.passengerCnt = reqData.passenger_cnt;
        res.status(200).json(RetData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function selectCandidates(req, res) {
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    const reqData = req.body; 
    // {
    //     "routeID": 3,
    //     "stopID": 23,
    //     "price": 116,
    // }
    try {
        let routeData = await routeService.getRouteById(reqData.routeID);
        routeData.available -= req.session.passengerCnt;
        if(routeData.available < 0){
            res.status(503).json( {message: "Seat not enough!"} );
        }
        await routeService.updateRoute(reqData.routeID, {available: routeData.available});
        
        // create passenger
        let passengerData = {
            "userID": passengerId,
            "routeID": reqData.routeID,
            "pickUpStopID" : 0,
            "dropOFFStopID": 0,
            "passengerCnt": req.session.passengerCnt,
            "price": reqData.price
        };

        if(routeData.type === "GO"){
            passengerData.dropOFFStopID = process.env.COMPANY_STOP_ID;
            passengerData.pickUpStopID = reqData.stopID;
        }
        else{
            passengerData.dropOFFStopID = reqData.stopID;
            passengerData.pickUpStopID = parseInt(process.env.COMPANY_STOP_ID);
        }
        const newPassenger = await passengersService.createPassenger(passengerData);
        res.status(201).json(newPassenger);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getArrivalTime(req, res) {
    console.log("123456789")
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    try {
        let passengerInfo = await passengersService.getPassengerById(passengerId);
        let routeInfo = await routeService.getRouteById(passengerInfo.routeID);
        let driverInfo = await userService.getUserById(routeInfo.driverID);
        let boardingInfo = await boardingService.getAllBoardings();
        let stopBoardings = boardingInfo.filter(
            boarding => 
            boarding.routeID === passengerInfo.routeID && 
            boarding.stopID === passengerInfo.pickUpStopID
        );
        // console.log(stopBoardings)
        let destinationBoardings = boardingInfo.filter(boarding => {
            return boarding.routeID === passengerInfo.routeID && 
            boarding.stopID === passengerInfo.dropOFFStopID;
        });
        // console.log(driverInfo.CarInfo.dataValues)
        let reutrnInfo = {
            CarInfo:driverInfo.CarInfo.dataValues,
            stop_arrival_time: stopBoardings[0].boardTime,
            dest_arrival_time: destinationBoardings[0].boardTime
        }
        // console.log(reutrnInfo)
        res.status(200).json(reutrnInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    showCandidates,
    selectCandidates,
    getArrivalTime
};
