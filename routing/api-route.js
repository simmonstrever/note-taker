const db = require("../db/db.json");
const fs = require("fs");


module.exports = function(app) {
    //GET
    app.get("/api/notes", function (req, res) {
        res.send(db);
    });

    //POST ROUTE
    app.post("/api/notes", function (req, res ) {

        //1) create new ID
        //2) Attatch new ID onto newnote
        //3) attatch new note to notes document (fswritefile)
    })

    //DELETE ROUTE
    app.delete("/api/notes/:id", (req, res) => {

        //1) retrieve all notes
        //2) filter all notes via note ID or title
        //3) rewrite file for all notes
        


    })
};