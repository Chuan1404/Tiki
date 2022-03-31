import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleCart: (state, action) => {
            state.isOpen = !state.isOpen
        }
    }
})

export default cartSlice;