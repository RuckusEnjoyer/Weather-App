const searchBtn = $('#search-btn');
let cityNameEl = $('#city-name');
let results = $('#results')

function createCityButton(searchCity) {
    var cityBtn = $('<button>').text(searchCity).addClass('city-btn');
    results.append(cityBtn);
}

$(document).ready(function() {
    var savedSearches = JSON.parse(localStorage.getItem('searches'));
    if (savedSearches) {
      savedSearches.forEach(function(searchCity) {
        createCityButton(searchCity);
      });
      
      if (savedSearches.length > 0) {
        var lastSearch = savedSearches[savedSearches.length - 1];
        $('#search').val(lastSearch);
        getWeather(lastSearch);
      }
    }
  });

var getWeather = function(searchCity) {
  var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=6475b3b0cca2c5c3858a7b09aadefc7c`;

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
      // // Get the weather condition
      // let weatherCondition = data.list[0].weather[0].main.toLowerCase();

      // // Determine the image URL based on the weather condition
      // let imageUrl;
      // switch (weatherCondition) {
      //   case 'clear':
      //     imageUrl = './assets/images/sunny.png';
      //     break;
      //   case 'clouds':
      //     imageUrl = './assets/images/cloudy.png';
      //     break;
      //   case 'rain':
      //     imageUrl = './assets/images/rainy.png';
      //     break;
      //   // Add more cases as needed...
      //   default:
      //     imageUrl = '../images/default.png';
      // }

      // // Create an image element and set its source to the image URL
      // let weatherImage = $('<img>').attr('src', imageUrl);

      // // Append the image to the page
      // $('#weather-image').empty().append(weatherImage);

      //elements on page
      let humidityEl = $('#humidity');
      let weatherEl = $('#weather');
      let tempEl = $('#temperature');
      let windEl = $('#wind');
      let fiveDaysEl = $('#5-days');

      fiveDaysEl.empty()
      // Storing data in variables
      let weather = data.list[0].weather[0].main
      let humidity = data.list[0].main.humidity; // Use data.list[0].main.humidity to get the humidity
      let temp = data.list[0].main.temp; // Use data.list[0].main.temp to get the temperature
      let wind = data.list[0].wind.speed; // Use data.list[0].wind.speed to get the wind speed

      // Update the elements on the page
      weatherEl.text("Weather: " + weather)
      humidityEl.text("Humidity: " + humidity);
      tempEl.text("Temperature: " + temp);
      windEl.text("Wind Speed: " + wind);

      // Display the forecast for the next five days
        for (let i = 8; i < data.list.length; i += 8) {
            let forecast = data.list[i];
            let date = new Date(forecast.dt * 1000).toLocaleDateString();
            let weather = forecast.weather[0].main
            let temp = forecast.main.temp;
            let humidity = forecast.main.humidity;
            
            // let cardEl = $('<div>').addClass('5dayscard')
            let forecastEl = $('<div>').addClass('forecast');
            let dateEl = $('<p>').text(date).addClass('dateEl');
            let weatherEl = $('<p>').text("Weather: " + weather)
            let tempEl = $('<p>').text('Temp: ' + temp);
            let humidityEl = $('<p>').text('Humidity: ' + humidity);

            forecastEl.append(dateEl, weatherEl, tempEl, humidityEl);
            fiveDaysEl.append(forecastEl);
        }

        if (!results.find(`button:contains(${searchCity})`).length) {
            createCityButton(searchCity)
        }
    })

    })
}

$(document).on('click', '.city-btn', function() {
  getWeather($(this).text());
});

searchBtn.on('click', function() {
    var searchCity = $('#search').val();
    
    // Retrieve the existing searches from localStorage
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    
    // Add the new search to the array
    searches.push(searchCity);
    
    // Save the updated array to localStorage
    localStorage.setItem('searches', JSON.stringify(searches));
    
    getWeather(searchCity);
  });