import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload));
            state.login = true;
        },
        logout: (state, action) => {
            localStorage.removeItem('token');
            state.login = false;
        }
    }
});

export const { login, logout } = loginSlice.actions
export default loginSlice