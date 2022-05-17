export function fetchLessonsFromServer() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };

    sessionStorage.removeItem("lessons")

    return fetch(`http://localhost:3000/api/lessons?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => res.json()
    ).then(
        data => {
            sessionStorage.setItem("lessons", JSON.stringify(data));
            return data;
        }
    );
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

    completedLessons.forEach((card) => {
        fetch(`http://localhost:3000/api/reviews?username=${
            encodeURIComponent(sessionStorage.getItem("username"))
        }&cardId=${
            encodeURIComponent(card.id)
        }`, requestOptions)
    });
}
