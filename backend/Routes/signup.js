const { Router } = require('express');
const router = Router();


router.post('/', function(req, res) {
    console.log(req.body);
    res.sendStatus(201)
});



module.exports = router;
