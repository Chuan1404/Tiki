import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        loginPopup: false,
        searchBox: false
    },
    reducers: {
        openLoginPopup: (state) => {
            const token = JSON.parse(localStorage.getItem('token'))
            if (!!token) return;
            state.loginPopup = true;
        },
        closeLoginPopup: (state) => {
            state.loginPopup = false;
        },
        openSearchBox: (state) => {
            state.searchBox = true
        },
        closeSearchBox: (state) => {
            state.searchBox = false
        }
    }
})

export const { openLoginPopup,
    closeLoginPopup,
    openSearchBox,
    closeSearchBox } = pageSlice.actions;
export default pageSlice;