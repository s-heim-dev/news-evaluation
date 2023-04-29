function handleSubmit(event) {
    event.preventDefault();

    let article = document.getElementById('article').value;

    if (Client.notEmpty(article) && Client.isUrl(article)) {
        togglePendingCursor();

        fetch(`http://localhost:3000/api?url=${article}`)
        .then(res => res.json())
        .then(res => Client.displayResult(res))
        .catch(err => Client.markUrlInputInfo(err))
        .finally(_ => togglePendingCursor())
    }
    else {
        Client.markUrlInputInfo("Invalid Input: Must be a URL starting with https:// or http://");
    }
    
}

function togglePendingCursor() {
    document.body.classList.toggle("pending");
}

export { handleSubmit }
