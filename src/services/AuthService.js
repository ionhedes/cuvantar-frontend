const baseUrl = process.env.REACT_APP_SERVER_URL

export function registerUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS)},
        body: JSON.stringify(user),
        mode: 'cors'
    };
    return fetch(`${baseUrl}/api/registration`, requestOptions);
}

export function loginUser(creds){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS)},
        mode: 'cors'
    };
    return fetch(`${baseUrl}/api/login?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`, requestOptions);
}

export function logoutUser() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS),
            'custom-token': sessionStorage.getItem("token")
        },
        mode: 'cors'
    };
    return fetch(`${baseUrl}/api/logout?username=${encodeURIComponent(sessionStorage.getItem("username"))}`, requestOptions);
}

export function isLoggedIn() {
    return sessionStorage.getItem('token') && sessionStorage.getItem('username')
}