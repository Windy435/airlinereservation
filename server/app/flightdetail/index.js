const express = require('express');
const flightDetailRoute = require('./flightdetail.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
// Config endpoints
router.route('/')
    .post(flightDetailRoute.post)
    .get(flightDetailRoute.get);
// Exports
//-----------------------------------
module.exports = router;
