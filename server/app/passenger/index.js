const express = require('express');
const passengerRoute = require('./passenger.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

router.route('/')
  .post(passengerRoute.post);

// Exports
//-----------------------------------
module.exports = router;
