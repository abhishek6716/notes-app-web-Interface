'use strict'

// read existing nates from localstorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON !== null ? JSON.parse(notesJSON) : []
    } catch(e){
        return []
    }
}

// save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// generate DOM element
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

// Sort your notes
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            } else if(a.updatedAt < b.updatedAt){
                return 1
            } else{
                return 0
            }
        })
    } else if (sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// render notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

// generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}