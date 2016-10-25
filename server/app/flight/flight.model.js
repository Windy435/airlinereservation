// app/models/flight.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
	flightId: String,
	departureId: String,
	arrivalId: String,
	date: Date,
	class: String,
	seat: Number,
	price: Number
});

module.exports = mongoose.model('Flight', FlightSchema);