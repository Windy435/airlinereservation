const express = require('express');
const expressValidator = require('express-validator');
const bookingRoute = require('./booking.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
router.use(expressValidator());

// Config endpoints
router.route('/')
  .post(bookingRoute.post);
router.route('/:id')
  .get(bookingRoute.getOne)
  .put(bookingRoute.put);

// Exports
//-----------------------------------
module.exports = router;
