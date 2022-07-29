// Create base variables
const API_KEY = "bd04a337c9efdec64ce163c91978bf26";
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?"
const BASE_GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?q"
let lat;
let lon;

// Create UVI range values
const low = [0,1,2]
const mod = [3,4,5]
const high = [6,7]
const vhigh = [8,9,10]
const extr = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]


let cityBtnValues = 
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

// Use Geocoding API to fetch city lat&lon data to pass to weatherFetch function

  function cityFetch (city) {
  fetch (`${BASE_GEO_URL}=${city}&limit=2&appid=${API_KEY}`)

    // Convert data to json
  .then(function (resp) {
    return resp.json(); 
    })

  // Pass the results to weatherFetch function
  .then(function (data) {
    console.log(data); 
    let lat = data[0].lat;
    let lon = data[0].lon;
    weatherFetch( lat, lon ); 
    })

    .catch(function() {
      // catch any errors
    });
  }

// Listen to submit click, grab input city value, and pass value to cityFetch function

  $("#citySearch").submit(function(event) {
    event.preventDefault();
    let city = $(".input-group-field").val();
    $("#currentCity").text(city);
    cityFetch (city)
  })


// Use OpenWeather API to fetch weather using lat&lon and use showWeather function to display on page

  function weatherFetch (lat, lon) {
    fetch (`${BASE_URL}lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}`)

    // Convert data to json
    .then(function(resp) { 
      return resp.json(); 
    }) 

    // Call showWeather function
    .then(function(data) {
      console.log(data);
      let uvi = Math.round(data.current.uvi);
      showWeather(data);
      colorUVI (uvi);
    })
    .catch(function() {
      // catch any errors
    });
  }

// Execute fetch using default city (Berlin) on load

  window.onload = function() {
    let lat = 52.5244;
    let lon = 13.4105;
    weatherFetch( lat, lon ); 
  }

// Show weather data on the page

  function showWeather( data ) {
    let celsiusTemp = Math.round(parseFloat(data.current.temp)-273.15);
    let fahrenheit = Math.round(((parseFloat(data.current.temp)-273.15)*1.8)+32); 
    let iconURL = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"  // Display weather icon

    $("#currentCity").text(data.timezone);
    $('.weatherIcon').attr('src', iconURL);
    $("#currentCityTemp").html(celsiusTemp + " &deg;C");
    $("#currentCityWind").html(`<strong>Wind: </strong>`+ data.current.wind_speed);
    $("#currentCityHumidity").html(`<strong>Humidity: </strong>`+ data.current.humidity + "&percnt;");
    $("#currentCityUVI").html(`<strong>UVI: </strong>` + `<div id="colorme" class="">` + data.current.uvi + `</div>`);
  }



  

// Check the UVI value and change its color appropriately
function colorUVI (uvi) {
  if (low.includes(uvi)) {
    $( "#colorme" ).last().addClass( "lowUVI" );
  } else if (mod.includes(uvi)) {
    $( "#colorme" ).last().addClass( "modUVI" );
  } else if (high.includes(uvi)) {
    $( "#colorme" ).last().addClass( "highUVI" );
  }
  else if (vhigh.includes(uvi)) {
    $( "#colorme" ).last().addClass( "vhighUVI" );
  }
  else {
    $( "#colorme" ).last().addClass( "extrUVI" );
  }
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