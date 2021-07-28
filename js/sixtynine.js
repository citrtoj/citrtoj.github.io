function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  return fToCel;
} 
document.getElementById("searchUser").focus();
document.getElementById("searchUser").value="";
const key="pk.c32bb53e9d7fad7298e5c4c9bb93b48a"

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
	fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${key}&limit=5&q="${revvalue}"&tag=place:city,place:town,place:borough,place:village,place:island,place:islet&dedupe=1`).then(function(response3){
		if(response3.ok){
			return response3.json();
		}else{
			return Promise.reject(response3);
		}
	}).then(function(data3){
		var datar=JSON.parse(JSON.stringify(data3));
		
		var lat3=datar[0].lat;
		var lon3=datar[0].lon;
		
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat3}&units=imperial&lon=${lon3}&appid=0ad8fc43e121ce281e27f86cd106ce96`).then(function(response4){
					if(response4.ok){
						return response4.json();
					} else{
						return Promise.reject(response4);
					}
				}).then(function(data4){
					var dataw4=JSON.parse(JSON.stringify(data4));
					var temp=dataw4.main.temp;
					document.getElementById("answer").classList.remove("gone");
					if(Math.round(temp)===69)
					{
						document.getElementById("yesno").innerHTML="Yes.";
						if(temp<69) document.getElementById("yesno").innerHTML+=" Pretty much."
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw4.main.temp + "°F / "+ (+fToC(dataw4.main.temp).toFixed(2)) +"°C</span> in " + datar[0].display_name + ".";
						
						document.getElementById("tryagain").innerHTML="But you can always check for other cities too!";
					}
					else
					{
						document.getElementById("yesno").innerHTML="No.";
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw4.main.temp + "°F / "+ (+fToC(dataw4.main.temp).toFixed(2)) +"°C</span> in " + datar[0].display_name + ".";
						if(Math.round(fToC(temp))==42)
						{
							document.getElementById("fortytwo").innerHTML="...which means it's <span class='black'>42°C!</span>";
						}
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
	fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${key}&limit=5&q="${input}"&tag=place:city,place:town,place:borough,place:village,place:island,place:islet&dedupe=1`).then(function(response){
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
		var datap=JSON.parse(JSON.stringify(data));
		document.getElementById("results").innerHTML="";
		datap.forEach(function(dat){
			var newel=document.createElement("li");
			newel.classList.add("autores");
			
			var licontent=dat.display_name;
			newel.innerHTML=licontent;
			document.getElementById("results").appendChild(newel);
			newel.addEventListener("click",function(){
				list.classList.add("gone");
				
				document.getElementById("answer").classList.remove("gone");
				document.getElementById("expl").innerHTML="Loading..."
				document.getElementById("yesno").innerHTML="";
				document.getElementById("tryagain").innerHTML="";
				document.getElementById("fortytwo").innerHTML="";
				searchbox.value=dat.display_name;
				var lat=dat.lat;
				var lon=dat.lon;
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
						if(temp<69) document.getElementById("yesno").innerHTML+=" Pretty much."
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw.main.temp + "°F / "+(+fToC(dataw.main.temp).toFixed(2)) +"°C</span> in " + dat.display_name + ".";
						document.getElementById("tryagain").innerHTML="But you can always check for other cities too!"
					}
					else
					{
						document.getElementById("yesno").innerHTML="No."
						document.getElementById("expl").innerHTML="It is <span class='black'>" + dataw.main.temp + "°F / "+(+fToC(dataw.main.temp).toFixed(2)) +"°C</span> in " + dat.display_name + ".";
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