// app/models/departure.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartureSchema = new Schema({
	group: String,
	province:[{departureName:String, departureId:String}]
});

module.exports = mongoose.model('Departure', DepartureSchema);