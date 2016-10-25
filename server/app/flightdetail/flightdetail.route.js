moment = require('moment');
FlightDetail = require('./flightdetail.model');

// Route methods
//-----------------------------------
module.exports.getOne = function (req, res, next) {
  // Validate request parameters
  req.checkParams({
    'bookingId': {
      notEmpty: true,
      isValidBookingId: true,
      errorMessage: 'Invalid bookingId'
    }
  });
  req.asyncValidationErrors()
    .then(function() {
      FlightDetail.find({
        // Conditions
        bookingId: req.params.bookingId
      }).exec()
        .then(function(fligtDetails) {
          // Cannot find
          if (fligtDetails === null) {
            return res.status(404).json();
          }

          return res.status(200).json({
            data: FlightDetail
          });
        })
        .catch(function(err) {
          return res.status(500).json();
        })
    })
    .catch(function() {
      return res.status(400).json();
    })
};

module.exports.post = function (req, res, next) {
  // Validate request parameters
  req.checkBody({
    'bookingId': {
      notEmpty: true,
      isValidBookingId: true,
      errorMessage: 'Invalid bookingId'
    }
  });
  req.asyncValidationErrors()
    .then(function (){
      var newFlightDetail = new FlightDetail({
        bookingId: req.body.bookingId,
        flightId: req.body.flightId,
        date: req.body.date,
        class: req.body.class,
        cost: req.body.cost
      });
      newFlightDetail.save()
        .then(function(flight) {
          return res.status(200).json({
            data: flight
          });
        })
        .catch(function (err) {
          return res.status(500).json({
            message: err
          });
        });
    })
    .catch(function(err) {
      return res.status(400).json({
        message: err
      });
    });
};

module.exports.get = (req, res, next) => {
  var startTime = moment.utc(+req.query.date).startOf('day');
  var endTime = moment.utc(startTime).add(1, 'day');
  
  FlightDetail.find({
    flightId: req.query.flightId,
    class: req.query.class,
    date: {
      $gte: startTime.toDate(),
      $lte: endTime.toDate()
    }
  }).exec()
    .then((flightdetails) => {
      if (flightdetails.lenght === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flightdetails
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
};