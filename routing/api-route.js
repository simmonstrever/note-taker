const db = require("../db/db.json");
const fs = require("fs");
const shortid = require("shortid");

console.log(shortid.generate());

module.exports = function (app) {
    //GET's all saved notes
    app.get("/api/notes", function (req, res) {
        res.send(db);
    });

    //POST for creating or editing a new or existing note
    app.post("/api/notes", function (req, res) {

        //1) create new ID
        let uniqueID = shortid.generate();

        //2) Attatch new ID onto newnote
        let note = {
            id: uniqueID
        }

        //3) attatch new note to notes document (fswritefile)
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            const noteDirectory = JSON.parse(data);
            noteDirectory.push(note);

            fs.writeFile("./db/db.json", JSON.stringify(noteDirectory, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("success")
            });
        });
    });

    //DELETE ROUTE
    app.delete("/api/notes/:id", (req, res) => {

        //1) retrieve all notes

        //2) filter all notes via note ID or title
        //3) rewrite file for all notes



    })
};