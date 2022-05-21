const baseUrl = process.env.REACT_APP_SERVER_URL

export async function getFlashcard(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
        },
        mode: 'cors'
    };

    let response = await fetch(`${baseUrl}/api/cards/${encodeURIComponent(id)}`, requestOptions);
    return await response.json();
}

export async function getAllFlashcards() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
        },
        mode: 'cors'
    };

    let response = await fetch(`http://localhost:3000/api/cards`, requestOptions);
    return await response.json();
}