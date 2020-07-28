//Dependencies
const express = require("express");


//Sets up express app
const app = express();
const PORT = process.env.PORT || 3000;

//express middleware prepares app for parsing our data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//assigns a static directory to the public directory telling rxpress to look inside the directory specified before checking other routes
app.use(express.static("public"));

// the (app) at the end of each require threads the app object through to the routes allowing us to use the methods below.
require("./routing/api-route")(app);
require("./routing/html-route")(app);


app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
});