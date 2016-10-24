const Departure = require('./departure.model');
const Arrival = require('./arrival.model');
const Flight = require('./flight.model');
var url = require('url');

//----------------------------------
module.exports.postDeparture = (req, res)=>{
	console.log(req.body);
	var departure = Departure();
	departure.group = req.body.group;
	departure.province = req.body.province;
	departure.save(err=>{
		if(err)
			return res.send(err);
		return res.status(200).json({message:"Created successfully"});
	});
};

module.exports.getAllDeparture = (req, res)=>{
	Departure.find((err, departures)=>{
		if(err)
			return res.send(err);
		if(Object.keys(departures).length === 0)
			return res.status(404).json({data:departures});
		return res.status(200).json({data:departures});
	});
};

module.exports.getDepartureById = (req, res)=>{
 	Departure.find({'province.departureId': req.params.departure_id},(err, departures)=>{
		if(err)
			return res.send(err);
		if(departures.length === 0)
			return res.status(404).json({data:departures});
		return res.status(200).json({data:departures});
	});	
};

module.exports.postArrivalByDepartureId = (req, res)=>{
	var arrival = Arrival();
	arrival.DepartureId = req.params.departure_id;
	arrival.arrivals = req.body.arrivals;

	arrival.save(err=>{
		if(err)
			return res.send(err);
		return res.status(200).json({message:"Created successfully"});
	});
};

module.exports.getArrivalByDepartureId = (req, res)=>{
	Arrival.find({DepartureId:req.params.departure_id}, (err, arrivals)=>{
		if(err)
			return res.send(err);
		if(arrivals.length === 0)
			return res.status(404).json({data:arrivals});
		return res.status(200).json(arrivals);
	});
};

module.exports.postFlight = (req, res)=>{
	var flight = Flight();
	flight.code = req.body.code;
	flight.departureId = req.body.departureId;
	flight.arrivalId = req.body.arrivalId;
	flight.date = req.body.date;
	flight.time = req.body.time;
	flight.level = req.body.level;
	flight.price = req.body.price;
	flight.countOfPlaneSeats = req.body.countOfPlaneSeats;
	flight.cost = req.body.cost;

	flight.save(err=>{
		if(err)
			return res.send(err);
		return res.status(200).json({message:"Created successfully"});
	});
};

module.exports.findFlight = (req, res)=>{
	Flight.find(
		{
			departureId:req.query.departureId,
			arrivalId:req.query.arrivalId,
			date:req.query.date,
			countOfPlaneSeats: req.query.countOfPlaneSeats
		},
		(err, flights)=>{
		if(err)
			return res.send(err);
		if(flights.length === 0)
			return res.status(404).json({data:flights});
		return res.status(200).json(flights);
	});
};