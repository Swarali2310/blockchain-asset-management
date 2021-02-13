
var propertyObject;
var lat;
var lng;
var property_data;
var x = "t"
$.getJSON('../Properties.json', function(data) {
      console.log("data"+data);
      x=data
      propertyObject = data[parseInt(document.cookie)];
      console.log(propertyObject);
    });
function viewDetails() {
   //console.log(snapshot.val());
   document.getElementById('propertySrc').src=propertyObject.picture;
   document.getElementById('overviewParameter').innerHTML = propertyObject.overview;
   document.getElementById('propertyTitle').innerHTML = propertyObject.title;
   document.getElementById('type').innerHTML = propertyObject.plan.type;
   document.getElementById('area').innerHTML = propertyObject.plan.area;
   document.getElementById('rate').innerHTML = propertyObject.plan.rate;
   document.getElementById('total').innerHTML = propertyObject.plan.total;
   lat = parseFloat(propertyObject.location.lat);
   lng = parseFloat(propertyObject.location.lng);
   console.log(lat);
    console.log(lng);

}


function initMap() {
    var uluru = {lat : 18.509890,lng :73.807182}
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
    });
    var marker = new google.maps.Marker({
    	position: uluru,
        map: map
    });
}