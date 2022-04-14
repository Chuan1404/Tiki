import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import mySaga from './saga';
import authSlice from './slices/authSlice';
import urlSlice from './slices/urlSlice';
import pageSlice from './slices/pageSlice';

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        page: pageSlice.reducer,
        url: urlSlice.reducer
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

