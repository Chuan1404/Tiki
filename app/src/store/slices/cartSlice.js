const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        setCart(state, action) {
            state.cart = action.payload
        }
    }
})

export const { setCart } = cartSlice.actions
export default cartSlice