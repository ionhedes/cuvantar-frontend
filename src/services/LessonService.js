import {getFlashcard} from "./FlashcardService";

function fetchLessonsFromServer() {
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
        data => sessionStorage.setItem('lessons', JSON.stringify(data))
    );
}

export async function getLessons() {

    fetchLessonsFromServer();

    let cards = [];

    for (const lessons of JSON.parse(sessionStorage.getItem("lessons"))) {
        cards = cards.concat(await getFlashcard(lessons.id));
    }

    return cards;
}
