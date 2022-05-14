function getLessons() {

    // should we save every batch of reviews in the session storage?
    // that way we won't have to query the backend for reviews twice (when starting reviews and when ending them)
    // also we will be able to correlate the answer booleans and the cards

    return [
        { word: "sare", translation: "salt"},
        { word: "lac", translation: "lake" },
        { word: "avion", translation: "plane" },
        { word: "citatie", translation: "subpoena"},
    ];
}

function* getLessonsGenerator() {

    let list = getLessons();

    yield* list;
}

export default getLessonsGenerator;