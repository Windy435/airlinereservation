const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
// Middlewares
const bodyParser = require('body-parser');
const morgan = require('morgan');

// API middlewares
const passengerEndpoint = require('./passenger');
const bookingEndpoint = require('./booking');

// Api routes config
//-----------------------------------
const apiRoute = express.Router();

// Config middle wares
apiRoute.use(bodyParser.urlencoded({extended: false}));
apiRoute.use(bodyParser.json());

// Mount endpoints
apiRoute.use('/passengers', passengerEndpoint);
apiRoute.use('/bookings', bookingEndpoint);

// App config
//-----------------------------------
const app = express();

// Config middleware
app.use(morgan('combined'));

// Mount endpoints
app.use('/api', apiRoute);

// Exports
//-----------------------------------
var server;

module.exports = {
	start: function () {
		server = http.createServer(app);
		mongoose.connect(config.connectionString);
		server.listen(config.port, function () {
			console.log(`Listening on port ${config.port}`);
		});
	},
	stop: function (callback) {
		server.close(callback);
	}
};
