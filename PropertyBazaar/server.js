var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var router = express.Router();
var router1 = express.Router();

//create instance of express
var app = express()
app.set('view engine','ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')
//__dirname is current directory in vhich the server.js script recides

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

//app.use(bodyParser())

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
});

app.use('/getPropertyDetails',router)
router.get('/',function(request,response,next){
	response.render('getPropertyDetails.ejs')
})


var fs = require('fs')

var fname;
var lname;
var propertyId;
var propertyTitle;
var propertyType;
var propertyArea;
var propertyRate;
var propertyTotal;
var street;
var city;
var state;
var overview;
var hour_water_supply = false
var hour_security = false
var club_house = false
var fire_fighting_equipment = false
var kids_play_ground = false
var Wifi_Connectivity = false
var Meditation_Center = false
var Senior_Citizen_Park = false
var Power_Backup = false
var Jogging_Amenities = false

app.get('/',function(request,response){
	//response.send("<h1>Prep For Prep</h1>")
	response.render('firstPage.ejs')
})

router.post('/',function(request,response,next){
	//console.log(request.body);
	//console.log(request.body.propertyId)
	propertyId = request.body.id;
	propertyTitle = request.body.title;
	overview = request.body.overview;
	propertyType = request.body.type;
	propertyArea = request.body.area;
	propertyRate = request.body.rate;
	propertyTotal = request.body.total;
	street = request.body.street;
	city = request.body.city;
	state = request.body.state;
	fname = request.body.fname;
	lname = request.body.lname;
	hour_water_supply = request.body.hour_water_supply
	hour_security = request.body.hour_security
	club_house = request.body.club_house
	fire_fighting_equipment = request.body.fire_fighting_equipment
	kids_play_ground = request.body.kids_play_ground
	Wifi_Connectivity = request.body.Wifi_Connectivity
	Meditation_Center = request.body.Meditation_Center
	Senior_Citizen_Park = request.body.Senior_Citizen_Park
	Power_Backup = request.body.Power_Backup
	Jogging_Amenities = request.body.Jogging_Amenities
	if(hour_water_supply=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(hour_security=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(club_house=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(fire_fighting_equipment=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(kids_play_ground=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(Wifi_Connectivity=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(Meditation_Center=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(Senior_Citizen_Park=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(Jogging_Amenities=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	if(Power_Backup=='on'){
		//console.log(hour_water_supply)
		hour_water_supply = true
	}
	var currentSearchResult = {
	id : propertyId,
	title : propertyTitle,
	firstName : fname,
	lastName : lname,
	overview : overview,
	picture : "images/new.jpg",
	plan : {
		type : propertyType,
		area : propertyArea,
		rate : propertyRate,
		total : propertyTotal
	},
	location : {
		street:street,
    		city:city,
    		state:state,
    		country:"",
    		lat:"",
    		lng:""
	},
	amenities:{
		hour_water_supply,
		hour_security,
		club_house,
		fire_fighting_equipment,
		kids_play_ground,
		Wifi_Connectivity,
		Meditation_Center,
		Senior_Citizen_Park,
		Power_Backup,
		Jogging_Amenities
	}
};

console.log(currentSearchResult);

fs.readFile('./views/Properties.json', function (err, data) {
    var json = JSON.parse(data)
    //console.log(json)
    json.push(currentSearchResult)
    //console.log(json)
    fs.writeFile('./views/Properties.json', JSON.stringify(json))
})
response.render('firstPage.ejs')
})


//'/' is the home page or index page
app.use('/PropertyDetails',router1)
router1.get('/',function(request,response,next){
	//console.log(request.params.id)
	//var temp = request.params.id
	//var responseObject
	//fs.readFile('./views/Properties.json', function (err, data) {
	  //  var js = JSON.parse(data)
	    //console.log(json)
			//console.log(json[request.params.id])
			//var i
			//for(i = 0;i<js.length;i++){
				//console.log(js[i])
				//if(js[i].id == temp){
					//responseObject = js[i]
					//break;
				//}
			//}
			//responseObject = js[i]
			//console.log(responseObject)
			response.render('PropertyDetails.ejs')

	//response.send(responseObject);
});

/*
app.get('*',function(reuest,response,next){
	response.send("404 Page Not Found")
})
*/

app.use('/sellable:id',function(request,responce){
	console.log(request.params.id);
})



app.listen(80, function(){
	console.log("App is running on port" + 80)
})
