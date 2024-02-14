const searchBtn = $('#search-btn');
let cityNameEl = $('#city-name');

var getWeather = function() {
  var searchCity = $('#search').val();

  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=6475b3b0cca2c5c3858a7b09aadefc7c`;

  fetch(geoUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
    var lat = data[0].lat;
    var lon = data[0].lon;
    let cityName = data[0].name;

    cityNameEl.text(cityName);
    
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=6475b3b0cca2c5c3858a7b09aadefc7c`;
    
    fetch(apiUrl)
    .then(function(response){
      return response.json();
    })
    .then(function (data){
      //elements on page
      let humidityEl = $('#humidity');
      let tempEl = $('#temperature');
      let windEl = $('#wind');
      let fiveDaysEl = $('#5-days');

      // Storing data in variables
      let humidity = data.list[0].main.humidity; // Use data.list[0].main.humidity to get the humidity
      let temp = data.list[0].main.temp; // Use data.list[0].main.temp to get the temperature
      let wind = data.list[0].wind.speed; // Use data.list[0].wind.speed to get the wind speed

      // Update the elements on the page
      humidityEl.text("Humidity: " + humidity);
      tempEl.text("Temperature: " + temp);
      windEl.text("Wind Speed: " + wind);

      // Display the forecast for the next five days
        for (let i = 8; i < data.list.length; i += 8) {
            let forecast = data.list[i];
            let date = new Date(forecast.dt * 1000).toLocaleDateString();
            let temp = forecast.main.temp;
            let humidity = forecast.main.humidity;

            let forecastEl = $('<div>').addClass('forecast');
            let dateEl = $('<p>').text('Date: ' + date);
            let tempEl = $('<p>').text('Temp: ' + temp);
            let humidityEl = $('<p>').text('Humidity: ' + humidity);

            forecastEl.append(dateEl, tempEl, humidityEl);
            fiveDaysEl.append(forecastEl);
        }
        })
  })
}

searchBtn.on('click', getWeather);