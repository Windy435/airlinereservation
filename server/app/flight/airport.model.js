// app/models/airport.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AirportSchema = new Schema({
	_id: String,
	name: String
});

module.exports = mongoose.model('Airport', AirportSchema);