const http = require('http');
const Airport = require('./airport.model');
const Flight = require('./flight.model');
var url = require('url');
//----------------------------------
function checkExistDataInArray(array, key) {
  for (var index in array) {
    if (array[index] === key)
      return true;
  }
  return false;
}
//----------------------------------
<<<<<<< HEAD
module.exports.postAirport = (req, res)=>{
	var airport = Airport();
	airport.AirportId = req.body.AirportId;
	airport.AirportName = req.body.AirportName;
	airport.save(err=>{
		if(err)
			return res.status(400).json({
				success:false,
				msg:err.message
			});
		return res.status(200).json({
			success:true,
			msg:"Created successfully!"
		});
	});
};

module.exports.getAllAirport = (req, res)=>{
	Airport.find((err, airports)=>{
		if(err)
			return res.status(400).json({
				success:false,
				msg:err.message
			});
		if(airports.length === 0)
			return res.status(404).json({
				success:false,
				msg:"Not found"
			});
		return res.status(200).json({
			success:true,
			data:airports
		});
	});
};

module.exports.getArrivalByDepartureId = (req, res, next)=>{
	Flight.find({
			departureId:req.params.departure_id
		})
		.select({arrivalId:1})
		.exec((err, flights)=>{
			if(err)
				return res.status(400).json({
				success:false,
				msg:err.message
			});
			if(flights.length === 0)
				return res.status(404).json({
					success:true,
					data:"Not found"
				});
			var arrivals = [];
			for(var index in flights){
				if(!checkExistDataInArray(arrivals, flights[index].arrivalId))
					arrivals.push(flights[index].arrivalId);
			}
			Airport
				.find({AirportId: {$in: arrivals}})
				.exec((err, airports)=>{
					if(err)
						return res.status(400).json({
										success:false,
										msg:err.message
									});
					if(airports.length === 0)
						return res.status(404).json({
							success:true,
							data:"Not found"
						});
					return res.status(200).json({
						success:true,
						data:flights
					});
				});
		});
=======
module.exports.postAirport = (req, res) => {
  var airport = Airport();
  airport._id = req.body.Id;
  airport.name = req.body.Name;
  airport.save(err => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    return res.status(200).json({
      success: true,
      msg: "Created successfully!"
    });
  });
};

module.exports.getDepartures = (req, res) => {
  Flight.find()
    .distinct('departureId')
    .exec()
    .then(function (flights) {
      if (flights.length === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flights
      });
    })
    .catch(function (err) {
      return res.status(500).json();
    });
};

module.exports.getArrivalByDepartureId = (req, res, next) => {
  Flight.find({
    // Conditions
    departureId: req.params.departureId
  }).distinct('arrivalId')
    .exec()
    .then(function (flight) {
      if (flight === 0) {
        return res.status(404).json();
      }

      return res.status(200).json({
        data: flight
      });
    })
    .catch(function (err) {
      return res.status(500).json();
    });
>>>>>>> a822c0fbcee3b0c06643462bf34851f3d11ceead
};

module.exports.postFlight = (req, res) => {
  var flight = Flight();
  flight.flightId = req.body.flightId;
  flight.departureId = req.body.departureId;
  flight.arrivalId = req.body.arrivalId;
  flight.date = req.body.date;
  flight.class = req.body.class;
  flight.seat = req.body.seat;
  flight.price = req.body.price;

<<<<<<< HEAD
	flight.save(err=>{
		if(err)
			return res.status(400).json({
				success:false,
				msg:err.message
			});
		return res.status(200).json({
			success:true,
			msg:"Create successfully!"
		});
	});
};

module.exports.GetAllFlight = (req, res)=>{
	Flight.find((err, flights)=>{
		if(err)
			return res.status(400).json({
				success:false,
				msg:err.message
			});
		if(flights.length === 0)
			return res.status(404).json({
				success:true,
				data:"Not found"
			});
		return res.status(200).json({
			success:true,
			data:flights
		});
	});
=======
  flight.save(err => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    return res.status(200).json({
      success: true,
      msg: "Create successfully!"
    });
  });
};

module.exports.GetAllFlight = (req, res) => {
  Flight.find((err, flights) => {
    if (err)
      return res.status(300).json({
        success: false,
        msg: err.message
      });
    if (flights.length === 0)
      return res.status(404).json({
        success: true,
        data: "Not found"
      });
    return res.status(200).json({
      success: true,
      data: flights
    });
  });
>>>>>>> a822c0fbcee3b0c06643462bf34851f3d11ceead
};

module.exports.searchFlight = (req, res) => {
  Flight.find({
    departureId: req.query.departureId,
    arrivalId: req.query.arrivalId
  }).where(() => {

  }).exec()
    .then(function (flights) {
      flights.forEach(function (value, index) {
        http.get(`http://localhost:3000/api/flightdetails/?flightId=${value.flightId}&date=${req.query.date}&class=${value.class}`, (res) => {
          console.log(res);
        });
      });
    })
    .catch(function (err) {
      return res.status(500).json(err);
    });
};