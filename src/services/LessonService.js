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

export async function getLessons() {

    if (!isLoggedIn()) {
        return [];
    }

    await fetchLessonsFromServer();
    return JSON.parse(sessionStorage.getItem("lessons"));
}

export function finishLessonSession() {
    const completedLessons = JSON.parse(sessionStorage.getItem("lessons"));

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };

    completedLessons.forEach((lesson) => {
        fetch(`http://localhost:3000/api/reviews?username=${
            encodeURIComponent(sessionStorage.getItem("username"))
        }&cardId=${
            encodeURIComponent(lesson.id)
        }`, requestOptions).then(response => response.json())
    });

    sessionStorage.removeItem("lessons");
}
