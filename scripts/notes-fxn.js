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
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // setup link
    noteEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl) 

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
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if(filterNotes.length > 0){
        filterNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            document.querySelector('#notes').appendChild(noteEl)
        })
    } else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show !';
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
}

// generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}