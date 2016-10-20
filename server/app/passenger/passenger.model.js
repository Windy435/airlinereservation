const mongoose = require('mongoose');

// Passenger Schema
//-----------------------------------
var passengerSchema = new mongoose.Schema({
  name: String
});

// Exports schema
//-----------------------------------
module.exports = mongoose.model('Passenger', passengerSchema);
