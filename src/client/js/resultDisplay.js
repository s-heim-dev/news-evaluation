function displayResult(data) {
    const holder = document.getElementById("results");

    const entries = document.createElement("entries");
    for (let key of Object.keys(data)) {
        const element = document.createElement("div");
        element.innerHTML = `${key} = ${data[key]}`;
        entries.appendChild(element);
    }

    holder.appendChild(entries);
}

function markInvalidUrl() {
    const element = document.getElementById("article");

    element.style.borderColor = "red";
}

export { displayResult, markInvalidUrl }
