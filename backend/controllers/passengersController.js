// const routeService = require('../services/routeService');
// const carInfoService = require('../services/carInfoService');
// const userService = require('../services/userService');

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
        const routes = await Routes_matching(reqData.address, 1, reqData.Go, reqData.board_time, reqData.passenger_cnt);
        RetData.Routes = routes;
        res.status(200).json(RetData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function selectCandidates(req, res) {
    try {
        //TO BE DONE
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
