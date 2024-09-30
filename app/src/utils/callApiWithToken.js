import { authService } from "services";

const callApiWithToken = async (url, options = {}) => {
    const token = JSON.parse(localStorage.getItem('token'));
    options = {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        }
    }
    let res = await fetch(url, options)

    if (res.status == 403) {
        const refreshToken = await authService.refreshToken();
        token.accessToken = refreshToken.data.accessToken;
        localStorage.setItem('token', JSON.stringify(token))

        options = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token.accessToken}`
            }
        }
        res = await fetch(url, options)
    }

    return res.json()
}

export default callApiWithToken