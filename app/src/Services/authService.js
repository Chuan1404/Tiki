import { API } from "constants";

const authService = {
    login(form) {
        return fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
    }
}
export default authService;