const mongoose = require('mongoose');

// Passenger Schema
//-----------------------------------
var passengerSchema = new mongoose.Schema({
  bookingId: String,
  firstName: String,
  lastName: String
});

// Exports schema
//-----------------------------------
module.exports = mongoose.model('Passenger', passengerSchema);
