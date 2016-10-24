const mongoose = require('mongoose');

// FlightDetails schema
//-----------------------------------
var flightDetailsSchema = new mongoose.Schema({
  bookingId: String,
  flightId: String,
  date: Date,
  class: String,
  cost: String
});

// Exports
//-----------------------------------
module.exports = mongoose.model('FlightDetails', flightDetailsSchema);