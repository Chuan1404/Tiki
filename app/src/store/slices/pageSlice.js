import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        popup: {
            login: false,
            address: false
        }
    },
    reducers: {
        openLogin: (state) => {
            state.popup.login = true;
        },
        closeLogin: (state) => {
            state.popup.login = false;
        },
        openSearch: (state) => {
            state.popup.search = true
        },
        closeSearch: (state) => {
            state.popup.search = false
        },
        openAddress: (state) => {
            state.popup.address = true
        },
        closeAddress: (state) => {
            state.popup.address = false
        },
    }
})

export const {
    openLogin,
    closeLogin,
    openAddress,
    closeAddress } = pageSlice.actions;
export default pageSlice;