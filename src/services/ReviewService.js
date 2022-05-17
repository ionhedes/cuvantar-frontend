import {getFlashcard} from "./FlashcardService";
import {isLoggedIn} from "./AuthService";

function fetchReviewsFromServer() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };
    fetch(`http://localhost:3000/api/reviews?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => res.json()
    ).then(
        data => sessionStorage.setItem('reviews', JSON.stringify(data))
    );
}

export async function getReviews() {

    if (!isLoggedIn()) {
        return [];
    }

    fetchReviewsFromServer();

    let cards = [];

    for (const review of JSON.parse(sessionStorage.getItem("reviews"))) {
        cards = cards.concat(await getFlashcard(review.id));
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
                encodeURIComponent(reviews[idx].id)
            }&passed=${
            encodeURIComponent(ans)
            }`, requestOptions).then(response => response.json);
    });

    sessionStorage.removeItem("reviews");
}