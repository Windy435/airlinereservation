// app/models/flight.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
<<<<<<< HEAD
	code: String,
	departureId:String,
	arrivalId:String,
	date:{ type: Date, default: Date.now },
	level:String,
	price:String,
	numberOfPlaneSeats:Number,
	cost:Number
=======
	flightId: String,
	departureId: String,
	arrivalId: String,
	date: Date,
	class: String,
	seat: Number,
	price: Number
>>>>>>> a822c0fbcee3b0c06643462bf34851f3d11ceead
});

module.exports = mongoose.model('Flight', FlightSchema);