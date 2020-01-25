const fs = require("fs");
const util = require("util");

const readFileA = util.promisify(fs.readFile);
const writeFileA = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    }

    read() {

    }

    write(note) {

    }

    getNotes() {

    }

    addNotes(note) {

    }

    delNotes(id) {

    }
}

module.exports = new Store();

