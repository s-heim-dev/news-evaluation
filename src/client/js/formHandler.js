function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
