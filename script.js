console.log("Welcome to notes app!")

const notes = [{
    title: 'my next trip',
    body: 'I would like to go spain'
}, {
    title: 'reading',
    body: 'Complete the reading of book'
},{
    title: 'payment',
    body: 'Have to pay to my friend'
}]

const filters = {
    searchText: ''
}

const renderNotes = function(notes, filters){
    const filterNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filterNotes.forEach(function(note){
        const noteEl = document.createElement('p')
        noteEl.textContent = note.title
        document.querySelector('#notes').appendChild(noteEl)
    })
}

renderNotes(notes, filters)

document.querySelector('button').addEventListener('click', function(){
    console.log('you clicked me!')
})

document.querySelector('#create-note').addEventListener('click', function(e){
    e.target.textContent = 'The button was clicked'
})

// document.querySelector('#remove-all').addEventListener('click', function (e) {
//     document.querySelectorAll('.note').forEach(function(note){
//         note.remove()
//     })
// })

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})
