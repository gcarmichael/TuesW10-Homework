var Forecast = function(location){
  this.url = 'http://localhost:3000/weather/' + location;
  this.data = null;
}

Forecast.prototype = {
  get: function(callback){
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      console.log(request.responseText);
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}

window.onload = function(){

  var form = document.querySelector('#locationSearch');
  var input = document.querySelector('#locationInput');
  var forecastView = document.querySelector('#forecastDisplay');

  form.onsubmit = function(event){
    event.preventDefault();
    var location = input.value;
    var currentForecast = new Forecast(location);
    currentForecast.get(function(){
      var data = currentForecast.data;
      var forecastDisplay = "<h4> Forecast for " + data.name + ": " + data.weather[0].main + "</h4>" + "<h5>" + data.weather[0].description + "</h5>" + "<h5>" + data.main.temp + "'>";

      forecastView.innerHTML = forecastDisplay;
    })
  }
}