const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function () {
  console.log('Server has started')
})

app.get('/',function (request,response) {
  response.sendFile(__dirname + '/index.html')
})

app.post('/', function (request,response) {
  const apikey = "bc57bca0117082034c6f13050acb581e";
  let cityName= request.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" + apikey + "&units=metric";

  https.get(url , function (res) {
    res.on('data',function (data) {
      var weatherInfo = JSON.parse(data);
      var weather = weatherInfo.weather[0].main;
      var temperature = weatherInfo.main.temp;
      var place = weatherInfo.name
      response.write('the weather in' +place+'is: ' + weather + " ");
      response.write('the temperature in' +place+'is: ' + temperature + "C");
      response.send();
    })
  })
})
