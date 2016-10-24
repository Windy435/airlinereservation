// app/models/airport.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AirportSchema = new Schema({
	AirportId: String,
	AirportName: String
});

module.exports = mongoose.model('Airport', AirportSchema);