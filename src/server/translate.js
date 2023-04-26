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

function translatePolarityTerm(obj) {
    obj.sentimented_concept_list.forEach(val => translateConceptOrEntity(val));

    return {
        text: obj.text,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        concept_list: obj.sentimented_concept_list
    }
}

function translateConceptOrEntity(obj) {
    return {
        form: obj.form,
        type: obj.type.substring(3).replaceAll(">", " / "),
        polarity: getPolarity(obj.score_tag)
    }
}

function translateSegment(obj) {
    obj.sentimented_entity_list.forEach(val => translateConceptOrEntity(val));
    obj.polarity_term_list.forEach(val => translatePolarityTerm(val));

    return {
        text: obj.text,
        type: obj.segment_type,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        entity_list: obj.sentimented_entity_list,
        polarity_term_list: obj.polarity_term_list
    }
}

function translateSentence(obj) {
    obj.segment_list.forEach(val => translateSegment(val));
    obj.sentimented_entity_list.forEach(val => translateConceptOrEntity(val));
    obj.sentimented_concept_list.forEach(val => translateConceptOrEntity(val));

    return {
        text: obj.text,
        confidence: getConfidence(obj.confidence),
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        segment_list: obj.segment_list,
        entity_list: obj.sentimented_entity_list,
        concept_list: obj.sentimented_concept_list
    }
}

function translateElement(obj) {
    obj.sentence_list.forEach(val => translateSentence(val));
    obj.sentimented_entity_list.forEach(val => translateConceptOrEntity(val));
    obj.sentimented_concept_list.forEach(val => translateConceptOrEntity(val));

    return {
        polarity: getPolarity(obj.score_tag),
        agreement: getAgreement(obj.agreement),
        subjectivity: getSubjectivity(obj.subjectivity),
        confidence: getConfidence(obj.confidence),
        irony: getIrony(obj.irony),
        sentence_list: obj.sentence_list,
        entity_list: obj.sentimented_entity_list,
        concept_list: obj.sentimented_concept_list
    }
}

export { translateElement }