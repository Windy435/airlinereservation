const Booking = require('./booking.model');

//-----------------------------------
function GenerateCode(number) {
  var tempString = '000000' + number;
  return tempString.substr(tempString.length - 6);
}

function CreateNewBooking() {
  var newBooking;

  return Booking.count().exec()
    .then(function (count) {
      newBooking = new Booking({
        _id: GenerateCode(count),
        date: new Date(),
        cost: 0,
        state: 0
      });
      return newBooking.save();
    });
}

//-----------------------------------
module.exports.post = function (req, res, next) {
  // Find an empty booking code
  Booking.findOne({
      state:-1
    }).exec()
    .then(function (booking) {
      // If cannot find an empty booking code, create a new one
      if (booking === null) {
        return CreateNewBooking()
          .then(function (newBooking) {
            return res.status(200).json({
              data: newBooking
            });
          })
          .catch(function (err) {
            return res.status(500).json({
              message: 'Booking queue is full'
            });
          });
      }
      // Return the empty booking code
      return Booking.findOneAndUpdate({
        // Conditions
        _id: booking._id
      }, {
        // New values
        date: new Date(),
        state: 0
      }, {
        // Options
        new: true
      }).exec()
        .then(function (newBooking) {
          return res.status(200).json({
            data: newBooking
          });
        })
        .catch(function (err) {
          return res.status(500).json({
            message: 'Unexpected saving error'
          });
        });
    })
    .catch(function (err) {
      console.log(`Error: ${err}`);
    });
};

module.exports.getOne = function (req, res, next) {
  var validationErrors;

  // Validate request parameters
  req.checkParams({
    "id": {
      notEmpty: true,
      errorMessage: "Invalid id"
    }
  });
  validationErrors = req.validationErrors();
  if (validationErrors) {
    return res.status(400).json({
      message: validationErrors
    });
  }

  Booking.findOne({
    _id: req.params.id
  }).exec()
    .then(function (booking) {
      if (booking === null) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: booking
      });
    })
    .catch(function (err) {
      return res.status(404).json();
    });
};

module.exports.put = function (req, res, next) {
  var validationErrors;

  // Validate request parameters
  req.checkParams({
    "id": {
      notEmpty: true,
      errorMessage: "Invalid id"
    }
  });
  req.checkBody({
    "state": {
      notEmpty: true,
      errorMessage: "Invalid state"
    }
  });
  validationErrors = req.validationErrors();
  if (validationErrors) {
    return res.status(400).json({
      message: validationErrors
    });
  }

  Booking.findOneAndUpdate({
    // Conditions
    _id: req.params.id
  }, {
    // New values
    state: req.body.state
  }, {
    // Option
    new: true
  }).exec()
    .then(function (booking) {
      return res.status(200).json({
        data: booking
      });
    })
    .catch(function (err) {
      return res.status(404).json();
    });
};
