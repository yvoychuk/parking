(function () {

  var express = require("express");
  var app = express();

  app.use(express.static("static"));

  app.get("/", function (req, res) {
    res.sendFile("index.html", {root: __dirname + "/static/"}, function (err) {
      console.log("load: index")
    });
  });

  app.listen(3019, function () {
    console.log("server started")
  })

})()