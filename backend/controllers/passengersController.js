const routeService = require('../services/routeService');
const passengersService = require('../services/passengerService');

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
        let passengerData = {
            "userID": passengerId,
            "routeID": reqData.routeID,
            "pickUpStopID" : 0,
            "dropOFFStopID": 0,
            "passengerCnt": req.session.passengerCnt,
            "price": reqData.price
        };
        console.log(process.env.COMPANY_STOP_ID)
        if(routeData.type === "GO"){
            passengerData.dropOFFStopID = process.env.COMPANY_STOP_ID;
            passengerData.pickUpStopID = reqData.stopID;
        }
        else{
            passengerData.dropOFFStopID = reqData.stopID;
            passengerData.pickUpStopID = parseInt(process.env.COMPANY_STOP_ID);
        }
        const newPassenger = await passengersService.createPassenger(passengerData);
        res.status(201).json( {message: "Select Route Successfully!"} );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getArrivalTime(req, res) {
    try {
        //TO BE DONE
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
