const Passenger = require('./passenger.model');

// Route methods
//-----------------------------------
module.exports.post = function (req, res, next) {
  var validationErrors;
  var newPassenger;

  // Validate request parameters
  req.checkBody({
    'name': {
      notEmpty: true,
      errorMessage: "Invalid name"
    }
  });
  validationErrors = req.validationErrors();
  if (validationErrors) {
    return res.status(400).json({
      message: validationErrors
    });
  }

  newPassenger = new Passenger({
    name: req.body.name
  });
  newPassenger.save(function (err) {
    if (err) {
      return res.status(500).json({
        message: "Unexpected server error, please try agains later"
      });
    }

    return res.status(200).json({
      data: newPassenger
    });
  });
};
