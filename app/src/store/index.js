import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import mySaga from './saga';
import addressSlice from './slices/addressSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import pageSlice from './slices/pageSlice';
import urlSlice from './slices/urlSlice';

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        page: pageSlice.reducer,
        url: urlSlice.reducer,
        address: addressSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer
    },
    middleware: [sagaMiddleWare]
})
sagaMiddleWare.run(mySaga)

const token = JSON.parse(localStorage.getItem('token'));
if(token) {
    store.dispatch({
        type: 'GET_PROFILE'
    })
}

export default store

