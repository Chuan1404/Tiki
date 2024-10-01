import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { authService, cartService, orderService, userService } from 'services';
import { update } from 'store/slices/addressSlice';
import { login, setProfile } from 'store/slices/authSlice';
import { setCart } from 'store/slices/cartSlice';
import { setOrder } from 'store/slices/orderSlice';
import { closeAddress } from 'store/slices/pageSlice';

function* fetchLogin(action) {
    try {
        const res = yield call(authService.login, action.payload)
        if(!res.error) {
            yield put(login(res));
            yield put({
                type: 'GET_PROFILE'
            })
        }
        else {
            alert(res.error)
        }
    } catch (err) {
        console.log(err)
    }
}
function* getCart() {
    try {
        const carts = yield call(cartService.getCart);
        yield put(setCart(carts.data))
    } catch (err) {
        console.log(err)
    }
}
function* getProfile() {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            const user = yield call(userService.getInfo);
            yield put(setProfile(user))
            yield put({ type: 'GET_CART' })
        }
    } catch (err) {
        console.log(err)
    }
}
function* getOrder() {
    try {
        const res = yield call(orderService.getAllOrder)
        if (res.data) {
            yield put(setOrder(res))
        }
    } catch (err) {
        console.log(err)
    }
}

function* updateArress(action) {
    try {
        yield put(update(action.payload))
        yield put(closeAddress())
    } catch (err) {
        console.log(err)
    }
}

function* updateCart(action) {
    try {
        const update = yield call(cartService.updateCart, action.payload.id, action.payload.quantity)
        if (update.data) {
            yield put({
                type: 'GET_CART'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

function* postOrder(action) {
    try {
        const res = yield call(orderService.order, action.payload);
        if (res.data) {
            yield put({ type: 'GET_ORDER' })
        } else if(res.err) {
            console.log(res.err)
        }
    } catch (err) {
        console.log(err)
    }
}

function* removeCart(action) {
    try {
        const res = yield call(cartService.removeCart, action.payload)
        if (res.data) {
            yield put({
                type: 'GET_CART'
            })
        }
    } catch (err) {
        console.log(err)
    }
}
function* removeCarts(action) {
    try {
        if (action.payload.length != 0) {
            for (let id of action.payload) {
                yield call(cartService.removeCart, id)
            }
            yield put({
                type: 'GET_CART'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

function* mySaga() {
    yield takeLatest('LOGIN', fetchLogin)

    yield takeLatest('GET_PROFILE', getProfile)
    yield takeLatest('GET_CART', getCart)
    yield takeLatest('GET_ORDER', getOrder)

    yield takeLatest('UPDATE_CART', updateCart)
    yield takeLatest('UPDATE_ADDRESS', updateArress)

    yield takeLatest('POST_ORDER', postOrder)

    yield takeLatest('REMOVE_CART', removeCart);
    yield takeLatest('REMOVE_CARTS', removeCarts)
}

export default mySaga;