const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Static constanst
//-----------------------------------
const config = {
	port: process.env.PORT || 3000,
	connectionString: process.env.CONNECTIONSTRING || 'mongodb://localhost/airlinereservation'
};

// Exports
//-----------------------------------
module.exports = config;
