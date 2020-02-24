const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => { return 'Your notes...' }

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title
    // })
    const duplicateNote = notes.find((note) => {
        return note.title === title
    })

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const result = JSON.stringify(notes)
    fs.writeFileSync('notes.json', result)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else if (notes.length == notesToKeep.length) {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    notes = loadNotes()
    console.log(chalk.red("Your notes:"))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    notes = loadNotes()
    const note = notes.find((note) => { note.title === title })
    if(note != undefined) {
        console.log(chalk.yellow.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note is not existing!"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}