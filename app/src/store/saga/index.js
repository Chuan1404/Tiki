import { takeLatest } from 'redux-saga/effects';
import { fetchLogin, fetchRegister } from './authSaga';
import { addCart, getCart, removeCart, removeCarts, updateCart } from './cartSaga';
import { getOrder, postOrder } from './orderSaga';
import { getProfile } from './userSaga';
import { updateArress } from './addressSaga';




function* mySaga() {
    yield takeLatest('LOGIN', fetchLogin)
    yield takeLatest('REGISTER', fetchRegister)

    yield takeLatest('GET_PROFILE', getProfile)
    yield takeLatest('GET_CART', getCart)
    yield takeLatest('GET_ORDER', getOrder)

    yield takeLatest('ADD_CART', addCart)
    yield takeLatest('UPDATE_CART', updateCart)
    yield takeLatest('UPDATE_ADDRESS', updateArress)

    yield takeLatest('POST_ORDER', postOrder)

    yield takeLatest('REMOVE_CART', removeCart);
    yield takeLatest('REMOVE_CARTS', removeCarts)
}

export default mySaga;