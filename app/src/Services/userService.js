import { API } from "constants"


const userService = {
    getInfo() {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token)

        return fetch(`${API}/user/get-info`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.data.accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }
}

export default userService