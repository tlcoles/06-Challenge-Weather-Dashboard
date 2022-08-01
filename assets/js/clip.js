// Stretch goal: Place in loop to create content for divs 
// This content is not yet in use.

let `dayCelsius${i}` = Math.round(parseFloat(data.daily[i].temp.day)-273.15);
let `date${i}` = new Date(data.daily[i].dt*1000).toLocaleDateString("en-GB", {dateStyle: "medium"});
$(`"#fcDay${i}"`).html(`date${i}`)
$(`"#dayIcon${i}"`).attr('src', smallURL + data.daily[i].weather[0].icon + ".png");
$(`"#dayTemp${i}"`).html(`dayCelsius${i}`` + " &deg;C");
$(`"#dayWind${i}"`).html(`<strong>Wind: </strong>`+ data.daily[i].wind_speed);
$(`"#dayHumidity${i}"`).html(`<strong>Humidity: </strong>`+ data.daily[i].humidity + "&percnt;");