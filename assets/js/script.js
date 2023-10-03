// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//TO DO: Make the City Search
var searchCity = $('#search')

//TO DO: Get the Api

var getWeather = function(){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6475b3b0cca2c5c3858a7b09aadefc7c}'

    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data){

    })
    
}

//TO DO: Create a city widget that contains the name of the city selected, the temperature, the humidity, and the wind speed

//TO DO: Create 5 cards that holds the forcast for 5 days

//TO DO: Store this search to Local Storage( Use the Array Method Teacher Taught You in Code Quiz)

//TO DO: Add a button based on the local Storage that will load Local Storage back onto the screen

