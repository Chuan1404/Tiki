import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        name: 'An Chu'
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        }
    }
});

export default loginSlice