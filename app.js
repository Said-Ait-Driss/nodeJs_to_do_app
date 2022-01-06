var express = require("express");

var app = express();

// set up the template engine
app.use("view engine","ejs");


// mapping the static files // ? middlware
app.use("/assests",express.static("./public")); // ? whenver we visit the assets link then you should look at public folder


// listen to port
const port = 3000;
app.listen(port);
console.log("we are listening to port : "+port);