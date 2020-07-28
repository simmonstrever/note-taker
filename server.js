const express = require("express");
const db = require("./db/db.json");
const fs = require("fs")
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routing/api-route")(app);
require("./routing/html-route")(app);

// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/notes.html"));
// });

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"))
// });


app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
});