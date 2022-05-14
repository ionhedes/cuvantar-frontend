function getReviews() {

    // should we save every batch of reviews in the session storage?
    // that way we won't have to query the backend for reviews twice (when starting reviews and when ending them)
    // also we will be able to correlate the answer booleans and the cards

    return [
        { word: "sare", answer: "salt" },
        { word: "lac", answer: "lake" },
        { word: "avion", answer: "plane" },
    ];
}

function* getReviewGenerator() {

    let list = getReviews();

    yield* list;
}

export default getReviewGenerator;