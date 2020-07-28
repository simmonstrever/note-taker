const db = require("../db/db.json");
const fs = require("fs");
const shortid = require("shortid");

console.log(shortid.generate());

module.exports = function (app) {
    //GET's all saved notes
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            return res.json(db)
        })
    });

    //POST for creating or editing a new or existing note
    app.post("/api/notes", function (req, res) {

        //1) create new ID
        let uniqueID = shortid.generate();
        

        //2) Attatch new ID onto newnote
        let newNote = {
            id: uniqueID,
            title: req.body.title,
            text: req.body.text
        }
        console.log(newNote);

        //3) attatch new note to notes document (fswritefile)
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const noteDirectory = JSON.parse(data);
            console.log(noteDirectory)
            noteDirectory.push(newNote);

            fs.writeFileSync("./db/db.json", JSON.stringify(noteDirectory, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("success")
            });
        });
    });

    //DELETE ROUTE
    app.delete("/api/notes/:id", (req, res) => {

        //1) retrieve all notes
        let uniqueID = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            const noteDirectory = JSON.parse(data);
            const updatedNotes = noteDirectory.filter(note => note.id != uniqueID);
            fs.writeFile("./db/db.json", JSON.stringify(updatedNotes, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("Note Gone!!")
            });
        });
    });
};