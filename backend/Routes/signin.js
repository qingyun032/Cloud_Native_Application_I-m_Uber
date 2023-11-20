const { Router } = require('express');
const router = Router();


app.get('/', function(req, res) {
    res.send('hello world');
});


module.exports = router;
