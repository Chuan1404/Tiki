import { createSlice } from '@reduxjs/toolkit';

const loginPopupSlice = createSlice({
    name: 'loginPopup',
    initialState: {
        isOpen: false
    },
    reducers: {
        open: (state, action) => {
            const token = JSON.parse(localStorage.getItem('token'))
            if (!!token) return;
            state.isOpen = true;
        },
        close: (state, action) => {
            state.isOpen = false;
        }
    }
})

export const { open, close } = loginPopupSlice.actions;
export default loginPopupSlice;