console.log("Welcome to notes app!")

let notes = []

const filters = {
    searchText: ''
}

const notesJSON = localStorage.getItem('notes')

if(notesJSON !== null){
    notes = JSON.parse(notesJSON)
}

const renderNotes = function(notes, filters){
    const filterNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach(function(note){
        const noteEl = document.createElement('p')
        if(note.title.length > 0){
            noteEl.textContent = note.title
        } else{
            noteEl.textContent = 'Unnamed note'
        }
        document.querySelector('#notes').appendChild(noteEl)
    })
}

renderNotes(notes, filters)

// document.querySelector('button').addEventListener('click', function(){
//     console.log('you clicked me!')
// })

document.querySelector('#create-note').addEventListener('click', function(e){
    notes.push({
        title: '',
        body: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes, filters)
})

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

// document.querySelector('#filter-by').addEventListener('change', function(e){
//     console.log(e.target.value)
// })




// document.querySelector('#remove-all').addEventListener('click', function (e) {
//     document.querySelectorAll('.note').forEach(function(note){
//         note.remove()
//     })
// })

// document.querySelector('#name-form').addEventListener('submit', function(e){
//     e.preventDefault()
//     console.log(e.target.elements.firstName.value)
//     e.target.elements.firstName.value = ''
// })

// document.querySelector('#for-fun').addEventListener('change', function (e) {
//     console.log(e.target.checked)
// })
