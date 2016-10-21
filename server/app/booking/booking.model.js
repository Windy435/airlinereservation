const mongoose = require('mongoose');

// Booking schema
//-----------------------------------
const bookingSchema = new mongoose.Schema({
  _id: String,
  date: Date,
  cost: Number,
  state: Number,      // -1: free, 0: locked, 1: booked
});

// Exports
//-----------------------------------
module.exports = mongoose.model('Booking', bookingSchema);
