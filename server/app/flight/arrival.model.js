// app/models/arrival.model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArrivalSchema = new Schema({
	DepartureId: String,
	arrivals:[
	{
		group:String, 
		province:[
		{
			arrivalName:String,
			arrivalId:String
		}]
	}]
});

module.exports = mongoose.model('Arrival', ArrivalSchema);