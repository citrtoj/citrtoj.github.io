function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  return fToCel;
} 
document.getElementById("searchUser").focus();
document.getElementById("searchUser").value="";

function truncate(input) {
   if (input.length > 46) {
      return input.substring(0, 46) + '...';
   }
   return input;
};

function submitt(){
	document.getElementById("yesno").innerHTML="";
	document.getElementById("expl").innerHTML="Loading..."
	document.getElementById("tryagain").innerHTML="";
	document.getElementById("fortytwo").innerHTML="";
	
	document.getElementById("results").classList.add("gone");
	var revvalue=document.getElementById("searchUser").value;
	fetch(`https://photon.komoot.io/api/?limit=5&q=${revvalue}&osm_tag=place:city&osm_tag=place:town&osm_tag=place:borough&osm_tag=place:village&osm_tag=place:hamlet&osm_tag=place:island&osm_tag=place:islet`).then(function(response3){
		if(response3.ok){
			return response3.json();
		}else{
			return Promise.reject(response3);
		}
	}).then(function(data3){
		var datar=JSON.parse(JSON.stringify(data3));

		var lat3=datar.features[0].geometry.coordinates[1];
		var lon3=datar.features[0].geometry.coordinates[0];
		var dats=datar.features[0];
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat3}&units=imperial&lon=${lon3}&appid=0ad8fc43e121ce281e27f86cd106ce96`).then(function(response4){
					if(response4.ok){
						return response4.json();
					} else{
						return Promise.reject(response4);
					}
				}).then(function(data4){
					var dataw4=JSON.parse(JSON.stringify(data4));
					var temp=dataw4.main.temp;
					var licontent=dats.properties.name + ", "  + (dats.properties.hasOwnProperty('county')?dats.properties.county+ ", ":"")+ (dats.properties.hasOwnProperty('state')?dats.properties.state+ ", ":"") + (dats.properties.hasOwnProperty('postcode')?dats.properties.postcode+ ", ":"") + dats.properties.country;

					document.getElementById("answer").classList.remove("gone");
					if(Math.round(temp)===69)
					{
						document.getElementById("yesno").innerHTML="Yes.";
						document.getElementById("yesno").classList.add("green");
						if(temp<69) document.getElementById("yesno").innerHTML+=" Pretty much."
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw4.main.temp + "°F / "+ (+fToC(dataw4.main.temp).toFixed(2)) +"°C</span> in " + licontent + ".";
						
						document.getElementById("tryagain").innerHTML="But you can always check for other cities too!";
					}
					else
					{
						document.getElementById("yesno").innerHTML="No.";
						document.getElementById("yesno").classList.remove("green");
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw4.main.temp + "°F / "+ (+fToC(dataw4.main.temp).toFixed(2)) +"°C</span> in " + licontent + ".";
						document.getElementById("tryagain").innerHTML="Try again with another city!";
					}
					
				}).catch(function(error){
					console.log(error);
				});
	});
}

document.getElementById("searchUser").addEventListener("keyup",function()
{
	var input=document.getElementById("searchUser").value;
	if(event.key === "Enter") {submitt();}
	else{
	document.getElementById("results").classList.remove("gone");
	var post;
	fetch(`https://photon.komoot.io/api/?limit=5&q=${input}&osm_tag=place:city&osm_tag=place:town&osm_tag=place:borough&osm_tag=place:village&osm_tag=place:hamlet&osm_tag=place:island&osm_tag=place:islet`).then(function(response){
		if(response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function(data) {
		//document.getElementById("results").innerHTML+=`<h1>${}</h1>`
		var html="";
		var searchbox = document.getElementById("searchUser");
		var list=document.getElementById("results");
		var datap=JSON.parse(JSON.stringify(data)).features;
		document.getElementById("results").innerHTML="";
		datap.forEach(function(dat){
			var newel=document.createElement("li");
			newel.classList.add("autores");
			
			var licontent=dat.properties.name + ", "  + (dat.properties.hasOwnProperty('county')?dat.properties.county+ ", ":"")+ (dat.properties.hasOwnProperty('state')?dat.properties.state+ ", ":"") + (dat.properties.hasOwnProperty('postcode')?dat.properties.postcode+ ", ":"") + dat.properties.country;
			newel.innerHTML=licontent;
			document.getElementById("results").appendChild(newel);
			newel.addEventListener("click",function(){
				list.classList.add("gone");
				
				document.getElementById("answer").classList.remove("gone");
				document.getElementById("expl").innerHTML="Loading..."
				document.getElementById("yesno").innerHTML="";
				document.getElementById("tryagain").innerHTML="";
				document.getElementById("fortytwo").innerHTML="";
				searchbox.value=licontent;
				var lat=dat.geometry.coordinates[1];
				var lon=dat.geometry.coordinates[0];
				fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=imperial&lon=${lon}&appid=0ad8fc43e121ce281e27f86cd106ce96`).then(function(response2){
					if(response2.ok){
						return response2.json();
					} else{
						return Promise.reject(response2);
					}
				}).then(function(data2){
					var dataw=JSON.parse(JSON.stringify(data2));
					var temp=dataw.main.temp;
					
					if(Math.round(temp)===69)
					{
						document.getElementById("yesno").innerHTML="Yes."
						document.getElementById("yesno").classList.add("green");
						if(temp<69) document.getElementById("yesno").innerHTML+=" Pretty much."
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw.main.temp + "°F / "+(+fToC(dataw.main.temp).toFixed(2)) +"°C</span> in " + licontent + ".";
						document.getElementById("tryagain").innerHTML="But you can always check for other cities too!"
					}
					else
					{
						document.getElementById("yesno").innerHTML="No."
						document.getElementById("yesno").classList.remove("green");
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw.main.temp + "°F / "+(+fToC(dataw.main.temp).toFixed(2)) +"°C</span> in " + licontent + ".";
						
						document.getElementById("tryagain").innerHTML="Try again with another city!"
					}
				}).catch(function(error){
					console.log(error);
				});
	
			document.querySelector("autores").focus();
			});
			
			
	
		});
	});
}});



document.getElementById("submit").addEventListener("click",submitt);