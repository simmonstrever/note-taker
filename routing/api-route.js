const db = require("../db/db.json");
const fs = require("fs");
const shortid = require("shortid");

console.log(shortid.generate());

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            return res.json(db)
        })
    });

    app.post("/api/notes", function (req, res) {

        
        let uniqueID = shortid.generate();
        
        
        let newNote = {
            id: uniqueID,
            title: req.body.title,
            text: req.body.text
        }
        console.log(newNote);

        
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

    
    app.delete("/api/notes/:id", (req, res) => {
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