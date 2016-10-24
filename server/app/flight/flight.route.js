const Airport = require('./airport.model');
const Flight = require('./flight.model');
var url = require('url');
//----------------------------------
function checkExistDataInArray(array, key){
	for(var index in array){
		if(array[index] === key)
			return true;
	}
	return false;
}
//----------------------------------
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
};

module.exports.postFlight = (req, res)=>{
	var flight = Flight();
	flight.code = req.body.code;
	flight.departureId = req.body.departureId;
	flight.arrivalId = req.body.arrivalId;
	flight.date = req.body.date;
	flight.level = req.body.level;
	flight.price = req.body.price;
	flight.countOfPlaneSeats = req.body.countOfPlaneSeats;
	flight.cost = req.body.cost;

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
};

module.exports.searchFlight = (req, res)=>{
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
			return res.status(404).json({
				success:false,
				msg:"Not found"
			});
		return res.status(200).json({
			success:true,
			data:flights
		});
	});
};