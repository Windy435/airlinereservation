// app/models/flight.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
	code: String,
	departureId:String,
	arrivalId:String,
	date:Date,
	time:Date,
	level:String,
	price:String,
	numberOfPlaneSeats:Number,
	cost:Number
});

module.exports = mongoose.model('Flight', FlightSchema);