const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
// app.set("view engine", "ejs");

let temp,name,icon,main,imageURL;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.CityName);
  const city = req.body.CityName;
//the url contains all the info in JSON format
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b3b9abac00f887d9af912a2cf1bac7f3";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
       temp = weatherData.main.feels_like; //tareget specific data
       main = weatherData.weather[0].main;
       icon = weatherData.weather[0].icon;
       imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(main);
      });

      res.write("<h1>The temperature in "+city+" feels like "+temp+" kelvin with "+main+"</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
    // res.render("report", {
    //   cityName: city,
    //   tempNo: temp,
    //   mainName: main,
    //   imgURL: imageURL
    // });
  });




app.listen(3000, function() {
  console.log("The server is running on port 3000");
});
