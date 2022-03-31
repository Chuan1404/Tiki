import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import loginSlice from './slices/loginSlice'


const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        cart: cartSlice.reducer
    },
})

export default store

