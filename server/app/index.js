const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('../config');
const app = express();

// API route require
//-----------------------------------
//const flightsRoute = require('flight');
//const bookingsRoute = require('booking');

// API routes
//-----------------------------------
const apiRoute = express.Router();

// Config middle wares
apiRoute.use(bodyParser.urlencoded({extended: false}));
apiRoute.use(bodyParser.json());

// Mount endpoints
//-----------------------------------
app.use('/api', apiRoute);

// Exports
//-----------------------------------
var server;

module.exports = {
	start: function () {
		server = http.createServer(app);
		server.listen(config.port, function () {
			console.log(`Listening on port ${config.port}`);
		});
	},
	stop: function (callback) {
		server.close(callback);
	}
};
