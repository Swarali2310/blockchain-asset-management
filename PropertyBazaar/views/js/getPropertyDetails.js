function totalCost(){
  var x = parseInt(document.getElementById("rate").value);
  var y = parseInt(document.getElementById("area").value);
  document.getElementById("total").value = x * y;
  console.log(x*y)
}

function AutoFunction(){
	document.getElementById("fname").value = "Joe"
	document.getElementById("lname").value = "Smith"
	document.getElementById("title").value = "Casa Blanca"
	document.getElementById("overview").value = "You have arrived in life. You look forward to retreat to a life all your own. Amidst quietness, chirping birds, undulating lawns, high fences and secured gated housing. That is Tulip Violet Gurgaon. Contemporary, with leafy avenues, multi-storied apartments, this is going to be an enviable address. It would leave the indelible impression in many many hearts just like our previous projects Tulip Ace, Tulip Grand, Tulip Petals, Tulip Orange, Tulip White, Tulip Ivory and Tulip Purple. Yes, Tulip Violet Gurgaon is designed to be self-sufficient, scenic township, which will offer amenities that exhibit a modern lifestyle at par with international standards. The township offers something for everyone."
	document.getElementById("type").value = "1 BHK"
	document.getElementById("state").value = "Maharashtra"
	document.getElementById("city").value = "Pune"
	document.getElementById("street").value = "Kothrud"
	document.getElementById("rate").value = String(Math.floor((Math.random() * 100) + 1));
	document.getElementById("area").value = String(Math.floor((Math.random() * 100) + 1));
	var x = parseInt(document.getElementById("rate").value);
  	var y = parseInt(document.getElementById("area").value);
  	document.getElementById("total").value = x * y;
  	console.log(x*y)
}
