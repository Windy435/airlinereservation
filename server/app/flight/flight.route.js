const moment = require('moment');
const Airport = require('./airport.model');
const Flight = require('./flight.model');
var url = require('url');
//----------------------------------
function checkExistDataInArray(array, key) {
  for (var index in array) {
    if (array[index] === key)
      return true;
  }
  return false;
}
//----------------------------------
module.exports.postAirport = (req, res) => {
  var airport = Airport();
  airport._id = req.body.Id;
  airport.name = req.body.Name;
  airport.save(err => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    return res.status(200).json({
      success: true,
      msg: "Created successfully!"
    });
  });
};

module.exports.getDepartures = (req, res) => {
  Flight.find()
    .distinct('departureId')
    .exec()
    .then(function (flights) {
      if (flights.length === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flights
      });
    })
    .catch(function (err) {
      return res.status(500).json();
    });
};

module.exports.getArrivalByDepartureId = (req, res, next) => {
  Flight.find({
    // Conditions
    departureId: req.params.departureId
  }).distinct('arrivalId')
    .exec()
    .then(function (flight) {
      if (flight === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flight
      });
    })
    .catch(function (err) {
      return res.status(500).json();
    });
};

module.exports.postFlight = (req, res) => {
  var flight = Flight();
  flight.flightId = req.body.flightId;
  flight.departureId = req.body.departureId;
  flight.arrivalId = req.body.arrivalId;
  flight.date = req.body.date;
  flight.class = req.body.class;
  flight.seat = req.body.seat;
  flight.price = req.body.price;

  flight.save(err => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    return res.status(200).json({
      success: true,
      msg: "Create successfully!"
    });
  });
};

module.exports.GetAllFlight = (req, res) => {
  Flight.find((err, flights) => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    if (flights.length === 0)
      return res.status(404).json({
        success: true,
        data: "Not found"
      });
    return res.status(200).json({
      success: true,
      data: flights
    });
  });
};

module.exports.searchFlight = (req, res) => {
  var startTime = moment.utc(+req.query.date).startOf('day');
  var endTime = moment.utc(startTime).add(1, 'day');


  console.log(`${req.query.date}`);
  console.log(`startTime = ${startTime.toDate()} | endTime = ${endTime.toDate()}`);

  Flight.find({
    departureId: req.query.departureId,
    arrivalId: req.query.arrivalId,
    date: {
      $gte: startTime.toDate(),
      $lte: endTime.toDate()
    }
  }).exec()
    .then(function (flights) {
      if (flights.lenght === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flights
      });
    })
    .catch(function (err) {
      return res.status(500).json(err);
    });
};