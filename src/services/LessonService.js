const baseUrl = process.env.REACT_APP_SERVER_URL

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

    return fetch(`${baseUrl}/api/lessons?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions).then(
        res => res.json()
    ).then(
        data => {
            sessionStorage.setItem("lessons", JSON.stringify(data));
            return data;
        }
    );
}

export function fetchMostRecentLessonsFromServer() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };

    return fetch(`${baseUrl}/api/reviews?username=${
            encodeURIComponent(sessionStorage.getItem("username"))
        }&recent=true`, requestOptions).then(
        res => res.json()
    ).then(
        data => {
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
        fetch(`${baseUrl}/api/reviews?username=${
            encodeURIComponent(sessionStorage.getItem("username"))
        }&cardId=${
            encodeURIComponent(card.id)
        }`, requestOptions)
    });
}
