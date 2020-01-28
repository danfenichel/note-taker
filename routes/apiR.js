const router = require("express").Router();
const store = require("../db/store");
const fs = require("fs");
const db = require("../db/db.json");

router.get("/notes", function(req, res){
    store
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
    // const notes = JSON.parse(fs.readFileSync(db));
    // return res.json(notes);
});

router.post("/notes", function(req, res){
    store
    .saveNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
    // let newNote = req.body;

    // let id = 0;

    // for (let i = 0; i < db.length; i++) {
    //     let note = db[i];

    //     if (note.id > id) {
    //         id = note.id;
    //     }
    // }
});

router.delete("/notes/:id", function(req, res){
    store
    .deleteNote(req.params.id)
    .then(() => res.json({ ok:true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;