var propertyObject = "property"
$.getJSON('../Properties.json', function(data) {
      propertyObject = data
      console.log(propertyObject);
      getPropertyDetails()
});

function getPropertyDetails(){
	for(var j = 0;j < propertyObject.length;j++){
		if(j%4==0){
			document.getElementById("propertyContainer").innerHTML +='<div class="row" id="'+parseInt(j/4)+'"></div>'
			console.log("created ID")
		}
		//document.getElementById(parseInt(j/4)).innerHTML += '<br><div class="content" id="'+parseInt(j/4)+'"><div class="division"><div class = "newspaper"><div style = "width:300px;height:300px"><image src = '+propertyObject[j].picture+' style = "width:300px;height:300px"></div><div><div><div class="newspaper"> <div><h2>Property Id : '+propertyObject[j].id+'</h2></div><div><h2>Property Title : '+propertyObject[j].title+'<h2></div></div><div ><div class="newspaper"> <div><h2>Street : '+propertyObject[j].location.street+'</h2></div><div style = "width:350px;height:75px"><h2>City : '+propertyObject[j].location.city+'</h2></div></div><div style = "width:700px;height:75px"><div class="newspaper"> <div style = "width:350px;height:75px"><h2>Type : '+propertyObject[j].plan.type+'<h2></div><div><h2>Area : '+propertyObject[j].plan.area+'<h2></div></div></div><div><form action = "/PropertyDetails" action = "get"><input type = "submit" class = "button1" value = "Get Details" onclick=""/></form></div></div></div></div></div><br>'
		document.getElementById(parseInt(j/4)).innerHTML += '<div class="PropertyCard"><div style="background-color:rgb(231, 228, 228);height:40px;"><div style="padding:10px">'+propertyObject[j].title+'</div></div><img class="avatar" style="width:290; height:auto; margin:10px" src ="'+propertyObject[j].picture+'"><div style="padding:10px"><b>Type :</b> '+propertyObject[j].plan.type+'</b></div><div style="padding:10px">'+"<b>Street : </b>"+propertyObject[j].location.street+'</div><div style="padding:10px"><b>City : </b>'+propertyObject[j].location.city+'</div><div style="padding:10px"><b>Value : </b>'+propertyObject[j].plan.total+'</div><form action = "/PropertyDetails" method = "get"><button class="std-button" type="submit" onclick="setCookie('+propertyObject[j].id+')">Details</button></form></div>'
		console.log("placing property")
	}
}

function myFunction(){
	var txt;
    	var person = prompt("Enter The Property Id", "Property Id");
    	if (person == null || person == "") {
        	txt = "User cancelled the prompt.";
    	} else {
        	onButtonAdd(person)
		console.log(person)	
    	}
}

function setCookie(pid){
	document.cookie=pid;
}