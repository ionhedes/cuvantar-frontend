import {getFlashcard} from "./FlashcardService";

export function fetchReviewsFromServer() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };

    return fetch(`http://localhost:3000/api/reviews?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => res.json()
    ).then(
        data => {
            sessionStorage.setItem("reviews", JSON.stringify(data));
            return data;
        }
    );
}

export async function convertReviewsToCards(reviews) {
    let cards = [];

    for (const review of reviews) {
        cards = cards.concat(await getFlashcard(review.card_id));
    }

    return cards;
}

export function sendReviewResults(answers) {

    let reviews = JSON.parse(sessionStorage.getItem("reviews"));

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };

    answers.forEach((ans, idx) => {
        fetch(`http://localhost:3000/api/reviews?username=${
                encodeURIComponent(sessionStorage.getItem("username"))
            }&cardId=${
                encodeURIComponent(reviews[idx].card_id)
            }&passed=${
            encodeURIComponent(ans)
            }`, requestOptions).then(response => response.json);
    });

    sessionStorage.removeItem("reviews");
}