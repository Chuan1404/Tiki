import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import mySaga from './saga';
import loginPopupSlice from './slices/loginPopupSlice';
import loginSlice from './slices/loginSlice';

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        loginPopup: loginPopupSlice.reducer
    },
    middleware: [sagaMiddleWare]
})
sagaMiddleWare.run(mySaga)
export default store

