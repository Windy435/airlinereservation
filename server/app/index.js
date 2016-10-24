const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
// Middlewares
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
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
apiRoute.use(expressValidator({
  customValidators: {
    isValidBookingId: function (id) {
      return new Promise(function (resolve, reject) {
        http.get(`http://${config.homepage}/api/bookings/${id}`, (res) => {
          if (res.statusCode === 200) {
            resolve();
          }
          reject();
        });
      });
    }
  }
}));

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

// Public config
//-----------------------------------
// Config static file
app.use(express.static(__base + '/client/dist'));

// Mount public
app.get('/', function(req, res, next) {
  res.sendFile(__base + '/client/dist/index.html');
});
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
