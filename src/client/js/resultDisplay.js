function displayResult(data) {
    if (data.hasOwnProperty("msg")) {
        markUrlInputInfo(data.msg);
        return;
    }

    const holder = document.getElementById("results");
    holder.firstChild.classList.remove("hidden");

    const entries = document.createElement("entries");
    for (let key of Object.keys(data)) {
        const element = document.createElement("div");
        element.innerHTML = `${key} = ${data[key]}`;
        entries.appendChild(element);
    }

    holder.appendChild(entries);

    markUrlInputInfo(undefined  , false);
}

function markUrlInputInfo(msg, markError=true) {
    const articleInput = document.getElementById("article");

    if (markError) {
        articleInput.classList.add("error");
        articleInput.nextElementSibling.innerHTML = msg;
    }
    else {
        articleInput.classList.remove("error");
    }
}

export { displayResult, markUrlInputInfo }
