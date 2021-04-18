// read existing nates from localstorage
const getSavedNotes = function(){
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    } else{
        return []
    }
}

// save notes to local storage
const saveNotes = function(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove a note from the list
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// generate DOM element
const generateNoteDOM = function(note){
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function(){
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
    textEl.setAttribute('href', `/ES6/notes-app/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

// render notes
const renderNotes = function (notes, filters) {
    const filterNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}