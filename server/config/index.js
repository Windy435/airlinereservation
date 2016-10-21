// Mongoose
//-----------------------------------
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Global
//-----------------------------------
global.__base = __dirname + '/';
global.config = {
	port: process.env.PORT || 3000,
	connectionString: process.env.CONNECTIONSTRING || 'mongodb://localhost/airlinereservation',
	homepage: process.env.HOMEPAGE || 'localhost:3000'
};
