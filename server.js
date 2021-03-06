var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
// if on Heroku or other server get port using process.env.PORT OR Port 3000 for localhost
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// get routes
require("./controllers/api-routes")(app);
require("./controllers/html-routes")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public")); // access to JS, CSS and Images files

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// assign main layout to rendering engine using Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// setup server using PORT
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });