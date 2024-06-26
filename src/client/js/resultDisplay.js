function getHtmlElement(element) {
    if (!element.classList) {
        return getHtmlElement(element.nextElementSibling);
    }

    return element;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayObject(obj, frame = null) {
    if (obj.length == 0) {
        markUrlInputInfo("Response Empty");
        return;
    }

    const holder = frame ? frame : document.createElement("div");
    holder.classList.add("result-holder");

    for (let key of Object.keys(obj)) {
        if (obj[key] instanceof Object) {
            if (!(obj[key] instanceof Array) || obj[key].length > 0) {
                const element = document.createElement("div");
                if (isNaN(key)) {
                    const headline = document.createElement("h3");
                    headline.innerHTML = capitalize(key.replace("_list", "s:"));

                    const results = displayObject(obj[key]);
                    results.classList.add("dotted-border");


                    element.appendChild(headline);
                    element.appendChild(results);
                }
                else {
                    displayObject(obj[key], element);
                }
                holder.appendChild(element);
            }
        }
        else {
            if (obj[key] != "") {
                if (obj[key].startsWith("Top>")) {
                    obj[key] = obj[key].replace("Top>", "").replaceAll(">", " / ");
                }

                const element = document.createElement("div");
                element.innerHTML = `${capitalize(key)}: <span>${obj[key]}</span>`;
                holder.appendChild(element);
            }
        }


    }

    return holder;
}

function displayResult(data) {
    if (data.hasOwnProperty("msg")) {
        markUrlInputInfo(data.msg);
        return;
    }

    const holder = document.getElementById("results");
    getHtmlElement(holder.firstChild).classList.remove("hidden");
    holder.appendChild(displayObject(data));

    markUrlInputInfo(undefined, false);
}

function markUrlInputInfo(msg, markError = true) {
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
