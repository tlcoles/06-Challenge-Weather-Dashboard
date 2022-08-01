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


// Listen for city button click and pass ID value to cityFetch()

$(".cities").click(function () {
  let city = this.id;
  cityFetch (city);
});

// Listen for search button click, grab input city value, and pass value to cityFetch()

$("#citySearch").submit(function(event) {
  event.preventDefault();
  let city = $(".input-group-field").val();
  localStorage.setItem("city", city)
  $("#currentCity").text(city);
  cityFetch (city)
})

//! Display searched cities

//! function displaySearched () {
//!  const searchedCities = JSON.parse(localStorage.getItem("searched"))
//!  searchedCities.forEach ((city) => {
//!    $("#cityList").append(`<li>${city}</li>`)
//!  } )
//! }
//! displaySearched()

// Use Geocoding API to fetch city lat&lon data to pass to weatherFetch function

  function cityFetch (city) {
  fetch (`${BASE_GEO_URL}=${city}&limit=2&appid=${API_KEY}`)

    // Convert data to json
  .then(function (resp) {
    return resp.json(); 
    })

  // Pass the results to weatherFetch function
  .then(function (data) {
    let lat = data[0].lat;
    let lon = data[0].lon;
    weatherFetch( lat, lon ); 

  // Save searched city names in localStorage
    const searchedCities = (() => {
      const cityValue = localStorage.getItem("searched")
      console.log(cityValue);
      return cityValue === null
        ? []
        : JSON.parse(cityValue)
    })()
      searchedCities.push(data[0].name)
      localStorage.setItem('searched', JSON.stringify(searchedCities));


    //Test to see whether to display a state or not
    if (data[0].state != undefined) { 
      $("#currentCity").text(data[0].name + ", " + data[0].state + ", " + data[0].country);
    } else {
      $("#currentCity").text(data[0].name + ", " + data[0].country);
    }
    })

    .catch(function() {
      // catch any errors
    });
  }


//! Use OpenWeather API to fetch weather using lat&lon and use showWeather function to display on page

  function weatherFetch (lat, lon) {
    fetch (`${BASE_URL}lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}`)

    // Convert data to json
    .then(function(resp) { 
      return resp.json(); 
    }) 

    // Call showWeather function
    .then(function(data) {
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
    cityFetch ("Berlin");
  }

// Show weather data on the page

  function showWeather( data ) {
    let celsiusTemp = Math.round(parseFloat(data.current.temp)-273.15);
    let fahrenheit = Math.round(((parseFloat(data.current.temp)-273.15)*1.8)+32); 
    let iconURL = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"  // Display weather icon
    let unixTime = data.daily[0].dt;
    let date = new Date(unixTime*1000).toLocaleDateString("en-GB", {dateStyle: "full"});

    $("#currentCityDateTime").text(date);
    $('.weatherIcon').attr('src', iconURL);
    $("#currentCityTemp").html(celsiusTemp + " &deg;C");
    $("#currentCityWind").html(`<strong>Wind: </strong>`+ data.current.wind_speed);
    $("#currentCityHumidity").html(`<strong>Humidity: </strong>`+ data.current.humidity + "&percnt;");
    $("#currentCityUVI").html(`<strong>UVI: </strong>` + `<div id="colorme" class="">` + data.current.uvi + `</div>`);

    let forecast5Day = [1,2,3,4,5];
    forecast5Day.forEach((i) => {
    forecast(i)
    });

    function forecast(i) {
      let dayCelsius = Math.round(parseFloat(data.daily[i].temp.day)-273.15);
      let dayFahrenheit = Math.round(((parseFloat(data.daily[i].temp.day)-273.15)*1.8)+32); 
      let smallURL = "https://openweathermap.org/img/wn/"

      let dayCelsius1 = Math.round(parseFloat(data.daily[1].temp.day)-273.15);
      let date1 = new Date(data.daily[1].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
      $("#fcDay1").html(date1)
      $("#dayIcon1").attr('src', smallURL + data.daily[1].weather[0].icon + ".png");
      $("#dayTemp1").html(dayCelsius1 + " &deg;C")
      $("#dayWind1").html(`<strong>Wind: </strong>`+ data.daily[1].wind_speed);
      $("#dayHumidity1").html(`<strong>Humidity: </strong>`+ data.daily[1].humidity + "&percnt;");

      let dayCelsius2 = Math.round(parseFloat(data.daily[2].temp.day)-273.15);
      let date2 = new Date(data.daily[2].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
      $("#fcDay2").html(date2)
      $("#dayIcon2").attr('src', smallURL + data.daily[2].weather[0].icon + ".png");
      $("#dayTemp2").html(dayCelsius2 + " &deg;C")
      $("#dayWind2").html(`<strong>Wind: </strong>`+ data.daily[2].wind_speed);
      $("#dayHumidity2").html(`<strong>Humidity: </strong>`+ data.daily[2].humidity + "&percnt;");

      let dayCelsius3 = Math.round(parseFloat(data.daily[3].temp.day)-273.15);
      let date3 = new Date(data.daily[3].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
      $("#fcDay3").html(date3)
      $('#dayIcon3').attr('src', smallURL + data.daily[3].weather[0].icon + ".png");
      $("#dayTemp3").html(dayCelsius3 + " &deg;C")
      $("#dayWind3").html(`<strong>Wind: </strong>`+ data.daily[3].wind_speed);
      $("#dayHumidity3").html(`<strong>Humidity: </strong>`+ data.daily[3].humidity + "&percnt;");

      let dayCelsius4 = Math.round(parseFloat(data.daily[4].temp.day)-273.15);
      let date4 = new Date(data.daily[4].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
      $("#fcDay4").html(date4)
      $('#dayIcon4').attr('src', smallURL + data.daily[4].weather[0].icon + ".png");
      $("#dayTemp4").html(dayCelsius4 + " &deg;C")
      $("#dayWind4").html(`<strong>Wind: </strong>`+ data.daily[4].wind_speed);
      $("#dayHumidity4").html(`<strong>Humidity: </strong>`+ data.daily[4].humidity + "&percnt;");

      let dayCelsius5 = Math.round(parseFloat(data.daily[5].temp.day)-273.15);
      let date5 = new Date(data.daily[5].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
      $("#fcDay5").html(date5)
      $('#dayIcon5').attr('src', smallURL + data.daily[5].weather[0].icon + ".png");
      $("#dayTemp5").html(dayCelsius5 + " &deg;C")
      $("#dayWind5").html(`<strong>Wind: </strong>`+ data.daily[5].wind_speed);
      $("#dayHumidity5").html(`<strong>Humidity: </strong>`+ data.daily[5].humidity + "&percnt;");
    }

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

//? OpenWeather data
//? data.lat
//? data.lon
//? data.current.temp
//? data.timezone
//? data.current.wind_speed
//? data.current.humidity
//? data.current.weather[0].icon 
//? data.current.weather[0].main <- description e.g., "Clouds"
//? data.daily[i].temp <-- i = 1 to 7; 0 is current day
//? data.daily[i].wind_speed
//? data.daily[i].humidity
//? data.daily[i].weather[0].icon
//? data.daily[i].weather[0].main