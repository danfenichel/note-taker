const fs = require("fs");
const util = require("util");

const readFileA = util.promisify(fs.readFile);
const writeFileA = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;

        const data = fs.readFileSync("./db.json", { encoding: "utf8" });
        if(data.length > 0) {
            let currentNotes = JSON.parse(data);
            for (let i = 0; i < currentNotes.length; i++) {
                const note = currentNotes[i];
                if(this.lastId < note.id) {
                    this.lastId = note.id;
                }
            }
        }
    }

    read() {
        return readFileA("./db.json", "utf8");
    }

    write(note) {
        return writeFileA("./db.json", JSON.stringify(note));
    }

    getNotes() {
        // * GET `/api/notes` 
        // Should read the `db.json` file and return all saved notes as JSON.
        return this.read()
            .then(notes => {
                let parseNotes;

                try {
                    parseNotes = [].concat(JSON.parse(notes));
                }
                catch (err) {
                    parseNotes = [];
                }
                return parseNotes;
            });
    }
    saveNote(note) {
        // * POST `/api/notes` 
        // - Should recieve a new note to save on the request body, add it to the `db.json` file, 
        // and then return the new note to the client.
        note.id = this.lastId + 1;
        this.lastId = note.id;

        return this.read()
            .then(notes => {
                let parseNotes = [].concat(JSON.parse(notes));

                parseNotes.push(note);

                this.write(parseNotes);
                return note;
            });
    }
    
    deleteNote(id) {
        // * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
        return this.read()
            .then(notes => {
                notes = [].concat(JSON.parse(notes));
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    if (note.id === id) {
                        notes.splice(i, 1);
                        break;
                    }
                }
                this.write(notes);
            });
    }
}

module.exports = new Store();

