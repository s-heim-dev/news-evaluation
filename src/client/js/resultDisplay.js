function getHtmlElement(element) {
    if (!element.classList) {
        return getHtmlElement(element.nextElementSibling);
    }

    return element;
}

function displayObject(obj, holder=document.createElement("div")) {
    holder.classList.add("result-holder");

    for (let key of Object.keys(obj)) {
        const element = document.createElement("div");

        if (obj[key] instanceof Object) {
            if (!(obj[key] instanceof Array) || obj[key].length > 0) {
                if (isNaN(key)) {
                    const headline = document.createElement("h3");
                    headline.innerHTML = key.replace("_list", "s:");
                    //headline.classList.add("result-holder");
                    
                    const results = displayObject(obj[key]);
                    results.classList.add("dotted-border");

                    element.appendChild(headline);
                    element.appendChild(results);
                }
                else {
                    displayObject(obj[key], element);
                }
            }
        }
        else {
            if (obj[key] != "") {
                element.innerHTML = `${key}: ${obj[key]}`;
            } 
        }
        
        holder.appendChild(element);
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
    
    markUrlInputInfo(undefined , false);
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
