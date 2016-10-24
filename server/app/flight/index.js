const express = require('express');
const flightRoute = require('./flight.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
// Config endpoints
 router.route('/')
  .post(flightRoute.postFlight)
  .get(flightRoute.GetAllFlight);
router.route('/search')
    .get(flightRoute.searchFlight);
router.route('/airports')
  .post(flightRoute.postAirport)
  .get(flightRoute.getAllAirport);
router.route('/airports/arrivals/:departure_id')
  .get(flightRoute.getArrivalByDepartureId);
// Exports
//-----------------------------------
module.exports = router;
