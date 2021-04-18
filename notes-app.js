console.log("Welcome to notes app!")

let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function(e){
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: ''
    })
    saveNotes(notes)
    location.assign(`/ES6/notes-app/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

const now = new Date()
console.log(now.toString())



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

// document.querySelector('button').addEventListener('click', function(){
//     console.log('you clicked me!')
// })
