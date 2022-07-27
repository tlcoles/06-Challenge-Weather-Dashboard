//* Create array of coordinates for city buttons
var cityBtnValues = 
[
  { city: "Washington, DC, US",
    lat: "38.8951",
    lon: "-77.0364"
  },
  { city: "New York City, US",
    lat: "40.7143",
    lon: "-74.006"
  },
  { city: "Berlin, DE",
    lat: "52.5244",
    lon: "13.4105"
  },
  { city: "Tokyo, JP",
    lat: "35.6895",
    lon: "139.6917"
  },
  { city: "Adelaide, AU",
    lat: "-34.9205",
    lon: "138.6006"
  }
];

// Fetch OpenWeather API data

function weatherFetch ( lat, lon ) {
  const API_KEY = "bd04a337c9efdec64ce163c91978bf26";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?"
  //
  fetch (`${BASE_URL}lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}`)

  // Convert data to json
  .then(function(resp) { 
    return resp.json(); 
  }) 

  // Call showWeather function
  .then(function(data) {
    console.log(data);
    showWeather(data); 
  })
  .catch(function() {
    // catch any errors
  });
}

// Execute fetch using default city (Berlin) 
let lat = 52.5244;
let lon = 13.4105;
window.onload = function() {
  weatherFetch( lat, lon ); 
}

function showWeather( data ) {
	let celsiusTemp = Math.round(parseFloat(data.current.temp)-273.15);
	let fahrenheit = Math.round(((parseFloat(data.current.temp)-273.15)*1.8)+32); 

  $("#currentCity").text(data.timezone);
  $("#currentCityTemp").html(celsiusTemp + " &deg;C");
  $("#currentCityWind").html(`<strong>Wind: </strong>`+ data.current.wind_speed);
  $("#currentCityHumidity").html(`<strong>Humidity: </strong>`+ data.current.humidity + "&percnt;");
  $("#currentCityUVI").html(`<strong>UVI: </strong>`+ data.current.uvi);

}

//! OpenWeather data
// data.lat
// data.lon
// data.current.temp
// data.timezone
// data.current.wind_speed
// data.current.humidity
// data.current.weather[0].icon 
// data.current.weather[0].main <- description e.g., "Clouds"
// data.daily[i].temp <-- i = 1 to 7; 0 is current day
// data.daily[i].wind_speed
// data.daily[i].humidity
// data.daily[i].weather[0].icon
// data.daily[i].weather[0].main