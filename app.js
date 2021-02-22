const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  req.body.cityName
    const query = req.body.cityName;
    const apiKey = "";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const tempText = "<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>\n";
        const descText = "<p>The weather is currently " + weatherData.weather[0].description + "</p>";
        res.write(tempText);
        res.write(descText);
        res.write("<img src='" + iconURL + "'/>");
        res.send();
      });
    });
  });


app.listen(3000, function() {
  console.log('Server running on port 3000');
});
