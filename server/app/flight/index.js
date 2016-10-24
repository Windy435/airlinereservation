const express = require('express');
const flightRoute = require('./flight.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
// Config endpoints
router.route('/departures')
  .post(flightRoute.postDeparture)
  .get(flightRoute.getAllDeparture)
router.route('/departures/:departure_id')
  .get(flightRoute.getDepartureById);
router.route('/arrivals/:departure_id')
  .post(flightRoute.postArrivalByDepartureId)
  .get(flightRoute.getArrivalByDepartureId);
 router.route('/')
  .post(flightRoute.postFlight)
  .get(flightRoute.findFlight);

// Exports
//-----------------------------------
module.exports = router;
