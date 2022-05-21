import {getFlashcard} from "./FlashcardService";

const baseUrl = process.env.REACT_APP_SERVER_URL

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

    sessionStorage.removeItem("reviews");
    sessionStorage.removeItem("completedReviews");


    return fetch(`${baseUrl}/api/reviews?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => {
            if (!res.ok && res.status === 403) {
                sessionStorage.setItem("sessionExpired", true);
            }
            return res.json();
        }
    ).then(
        data => {
            sessionStorage.setItem("reviews", JSON.stringify(data));
            return data;
        }
    );
}

export async function convertReviewsToCards(reviews, limit=100) {
    let cards = [];
    let i = 0;
    for (const review of reviews) {
        i += 1;
        cards = cards.concat(await getFlashcard(review.card_id));
        if(i >= limit) break;
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
        reviews[idx].result = ans;
        fetch(`${baseUrl}/api/reviews?username=${
                encodeURIComponent(sessionStorage.getItem("username"))
            }&cardId=${
                encodeURIComponent(reviews[idx].card_id)
            }&passed=${
            encodeURIComponent(ans)
            }`, requestOptions).then(res => {
                if (!res.ok && res.status === 403) {
                    sessionStorage.setItem("sessionExpired", "true");
                }
        })
    });

    return reviews.slice(0, answers.length);
}

export async function filterFinishedReviews(reviews, status) {

    return convertReviewsToCards(reviews.filter(r => r.result === status));
}