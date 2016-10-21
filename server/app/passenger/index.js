const express = require('express');
const http = require('http');
const expressValidator = require('express-validator');
const passengerRoute = require('./passenger.route');

// Config endpoints
//-----------------------------------
const router = express.Router();

// Config middlewares
router.use(expressValidator({
  customValidators: {
    isValidBookingId: function (id) {
      return new Promise(function (resolve, reject) {
        http.get(`http://${config.homepage}/api/bookings/${id}`, (res) => {
          if (res.statusCode === 200) {
            resolve();
          }
          reject();
        });
      });
    }
  }
}));

// Config endpoints
router.route('/')
  .post(passengerRoute.post);

// Exports
//-----------------------------------
module.exports = router;
