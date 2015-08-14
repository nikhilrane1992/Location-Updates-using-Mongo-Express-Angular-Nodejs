var express = require('express');
app = express();

//serve static files
app.use('/static', express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/location_updates_database');

var bodyParser = require('body-parser')
app.use(bodyParser.json({}));

var latLngSchema = {
	imei_no:String,
	lat:String,
	lng:String,
	app_time_stamp:String,
	server_time_stamp:String
}

var locationUpdates = mongoose.model('Location', latLngSchema, 'location_updates')

server = require('http').createServer(app);

server.listen(process.env.PORT || 3000);
app.post('/get/latlng', function(req, res){
	locationUpdates.find({imei_no:req.body.imei_no}, function(err, doc){
		res.send(doc);
	});
	// res.sendFile(__dirname + '/index.html');
});

//save post data
app.post('/save/location_update/data', function(req, res){
	var d = new Date().getTime(); 
	new locationUpdates({
	imei_no:req.body.imei_no,
	lat:req.body.lat,
	lng:req.body.lng,
	app_time_stamp:d,
	server_time_stamp:req.body.server_time_stamp
	}).save(function(err, doc){
		if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': false});
		else res.send({'validation': 'Successfully inserted..', 'status': true});
	});
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/locationUpdates.html');
});

