export function isLoggedIn() {
    return sessionStorage.getItem('token') && sessionStorage.getItem('username')
}