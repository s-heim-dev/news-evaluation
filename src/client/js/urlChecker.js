function notEmpty(text) {
    return text.trim().length != 0;
}

function isUrl(text) {
    try {
        new URL(text);
        return true;
    }
    catch(_) {
        return false;
    }
}

export { notEmpty, isUrl }
