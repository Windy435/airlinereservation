const Passenger = require('./passenger.model');

// Route methods
//-----------------------------------
module.exports.post = function (req, res, next) {
  var newPassenger;

  // Validate request parameters
  req.checkBody({
    'bookingId': {
      notEmpty: true,
      isValidBookingId: true,
      errorMessage: 'Invalid bookingId'
    },
    'firstName': {
      notEmpty: true,
      errorMessage: 'Invalid firstName'
    },
    'lastName': {
      notEmpty: true,
      errorMessage: 'Invalid lastName'
    }
  });
  req.asyncValidationErrors()
    .then(function () {
        newPassenger = new Passenger({
          bookingId: req.body.bookingId,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });
        newPassenger.save()
          .then(function (passenger) {
            return res.status(200).json({
              data: newPassenger
            });
          })
          .catch(function (err) {
            if (err) {
              return res.status(500).json({
                message: "Unexpected server error, please try agains later"
              });
            }
          });
    })
    .catch(function (err) {
      return res.status(400).json({
        message: err
      });
    });
};

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
    .then(function () {
      Passenger.find({
        // Conditions
        bookingId: req.params.bookingId
      }).exec()
        .then(function (passengers) {
          // Not found
          if (passengers === undefined || passengers.length === 0) {
            return res.status(404).json();
          }

          return res.status(200).json({
            data: passengers
          });
        })
        .catch(function (err) {
          return res.status(500).json();
        })
    })
    .catch(function (err) {
      return res.status(400).json({
        message: err
      });
    });
};