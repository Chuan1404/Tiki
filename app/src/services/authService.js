import { API } from "constants";

const authService = {
    login(form) {
        return fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
    },
    register(form) {
        return fetch(`${API}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
    },

    refreshToken() {
        const token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${API}/refresh-token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token.refreshToken
            })
        }).then(res => res.json())
    }
}
export default authService;