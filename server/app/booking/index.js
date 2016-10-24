const express = require('express');
const bookingRoute = require('./booking.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config endpoints
router.route('/')
  .post(bookingRoute.post);
router.route('/:id')
  .get(bookingRoute.getOne)
  .put(bookingRoute.put);

// Exports
//-----------------------------------
module.exports = router;
