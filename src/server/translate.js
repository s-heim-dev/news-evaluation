function getPolarity(value) {
    switch (value) {
        case "P+":
            return "strong positive";
        case "P": 
            return "positive";
        case "NEU":
            return "neutral";
        case "N":
            return "negative";
        case "N+":
            return "strong negative";
        default:
            return "without polarity";
    }
}

function getAgreement(value) {
    if (value === "AGREEMENT") {
        return "true (the different elements have the same polarity)";
    } {
        return "negative (there is disagreement between the different elements' polarity)";
    }
}

function getSubjectivity(value) {
    if (value === "SUBJECTIVITY") {
        return "true (the text has subjective marks)";
    }
    else {
        return "false (the text does not have any subjectivity marks)";
    }
}

function getConfidence(value) {
    return `${value}%`;
}

function getIrony(value) {
    if (value === "IRONIC") {
        return "true (the text has irony marks)";
    }
    else {
        return "false (the text does not have any irony marks)";
    }
}

function translateOrCreate(arr, fn) {
    if (!arr) {
        return [];
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i]);
    }

    return arr;
}

function translatePolarityTerm(obj) {
    return {
        text: obj.text,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        concept_list: translateOrCreate(obj.sentimented_concept_list, translateConceptOrEntity)
    }
}

function translateConceptOrEntity(obj) {
    return {
        form: obj.form,
        type: obj.type.substring(4).replaceAll(">", " / "),
        polarity: getPolarity(obj.score_tag)
    }
}

function translateSegment(obj) {
    return {
        text: obj.text,
        type: obj.segment_type,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        entity_list: translateOrCreate(obj.sentimented_entity_list, translateConceptOrEntity),
        polarity_list: translateOrCreate(obj.polarity_term_list, translatePolarityTerm)
    }
}

function translateSentence(obj) {
    return {
        text: obj.text,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        segment_list: translateOrCreate(obj.segment_list, translateSegment),
        entity_list: translateOrCreate(obj.sentimented_entity_list, translateConceptOrEntity),
        concept_list: translateOrCreate(obj.sentimented_concept_list, translateConceptOrEntity)
    }
}

function translateElement(obj) {
    return {
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        subjectivity: getSubjectivity(obj.subjectivity),
        confidence: getConfidence(obj.confidence),
        irony: getIrony(obj.irony),
        sentence_list: translateOrCreate(obj.sentence_list, translateSentence),
        entity_list: translateOrCreate(obj.sentimented_entity_list, translateConceptOrEntity),
        concept_list: translateOrCreate(obj.sentimented_concept_list, translateConceptOrEntity)
    }
}

module.exports = translateElement
