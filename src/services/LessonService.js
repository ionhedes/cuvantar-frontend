import {getFlashcard} from "./FlashcardService";
import {isLoggedIn} from "./AuthService";

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
    fetch(`http://localhost:3000/api/lessons?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => res.json()
    ).then(
        data => sessionStorage.setItem('lessons', JSON.stringify(data))
    );
}

export function getLessons() {

    if (!isLoggedIn()) {
        return [];
    }

    fetchLessonsFromServer();
    return JSON.parse(sessionStorage.getItem("lessons"));
}
