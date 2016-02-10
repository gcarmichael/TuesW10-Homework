var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/weather', function(req, res){
  res.render('weather');
});

app.get('/weather/:location', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + request.params.location + '&appid=93da4e0edf58a58b5044d6d7a25836e7&units=metric', function(res){
    var body = "";

    res.on('data', function(d){
      body += d;
    });

    res.on('end', function(){
      var weather = JSON.parse(body);
      response.send(weather);
    });
  });
});

app.listen('3000', function(){
  console.log('Serving on port 3000');
});