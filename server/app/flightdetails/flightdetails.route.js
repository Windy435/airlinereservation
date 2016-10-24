FlightDetails = require('./flightdetails.model');

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
      FlightDetails.find({
        // Conditions
        bookingId: req.params.bookingId
      }).exec()
        .then(function(fligtDetails) {
          // Cannot find
          if (fligtDetails === null) {
            return res.status(404).json();
          }

          return res.status(200).json({
            data: FlightDetails
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
};