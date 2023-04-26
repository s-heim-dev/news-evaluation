function handleSubmit(event) {
    event.preventDefault();

    let article = document.getElementById('article').value;

    if (Client.notEmpty(article) && Client.isUrl(article)) {
        fetch(`http://localhost:3000/api?url=${article}`)
        .then(res => res.json())
        .then(res => Client.displayResult(res))
        .catch(err => Client.markUrlInputInfo(err));
    }
    else {
        Client.markUrlInputInfo("Invalid Input: Must be a URL starting with https:// or http://");
    }
    
}

export { handleSubmit }
