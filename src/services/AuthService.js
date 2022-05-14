export function RegisterUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS)},
        body: JSON.stringify(user),
        mode: 'cors'
    };
    return fetch('http://localhost:3000/api/registration', requestOptions);
}

export function LoginUser(creds){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(process.env.REACT_APP_API_CREDS)},
        mode: 'cors'
    };
    return fetch(`http://localhost:3000/api/login?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`, requestOptions);
}