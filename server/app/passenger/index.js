const express = require('express');
const http = require('http');
const passengerRoute = require('./passenger.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config endpoints
router.route('/')
  .post(passengerRoute.post);
router.route('/:bookingId')
  .get(passengerRoute.getOne);

// Exports
//-----------------------------------
module.exports = router;
