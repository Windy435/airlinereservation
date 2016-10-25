const express = require('express');
const flightRoute = require('./flight.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
// Config endpoints
 router.route('/')
  .post(flightRoute.postFlight)
  .get(flightRoute.searchFlight);
router.route('/airports')
  .post(flightRoute.postAirport)
router.route('/departures')
  .get(flightRoute.getDepartures);
router.route('/departures/:departureId/arrivals')
  .get(flightRoute.getArrivalByDepartureId);
// Exports
//-----------------------------------
module.exports = router;
