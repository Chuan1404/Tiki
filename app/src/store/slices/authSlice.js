import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload.data));
            state.isLogin = true;
        },
        setProfile: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            localStorage.removeItem('token');
            state.isLogin = false;
        }
    }
});

export const { login, logout, setProfile } = loginSlice.actions
export default loginSlice