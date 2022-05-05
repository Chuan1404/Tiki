import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { authService, cartService, orderService, userService } from 'Services';
import { update } from 'store/slices/addressSlice';
import { login, setProfile } from 'store/slices/authSlice';
import { setCart } from 'store/slices/cartSlice';
import { setOrder } from 'store/slices/orderSlice';
import { closeAddress } from 'store/slices/pageSlice';

function* fetchLogin(action) {
    try {
        const data = yield call(authService.login, action.payload)
        yield put(login(data));
        yield put({
            type: 'GET_PROFILE'
        })
    } catch (err) {
        alert(err)
    }
}
function* getCart() {
    try {
        const carts = yield call(cartService.getCart);
        yield put(setCart(carts.data))
    } catch (err) {
        alert(err)
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
        alert(err)
    }
}
function* getOrder() {
    try {
        const res = yield call(orderService.getAllOrder)
        if (res.data) {
            yield put(setOrder(res))
        }
    } catch (err) {
        alert(err)
    }
}

function* updateArress(action) {
    try {
        yield put(update(action.payload))
        yield put(closeAddress())
    } catch (err) {
        alert(err)
    }
}
function* updateCart(action) {
    try {
        const update = yield call(cartService.updateCart, action.payload.id, action.payload.quantity)
        if (update.updateCount) {
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
        console.log(res)
        if (res.data) {
            yield put({ type: 'GET_ORDER' })
        } else if(res.err) {
            alert(res.err)
        }
    } catch (err) {
        alert(err)
    }
}

function* removeCart(action) {
    try {
        const res = yield call(cartService.removeCart, action.payload)
        if (res.updateCount) {
            yield put({
                type: 'GET_CART'
            })
        }
    } catch (err) {
        alert(err)
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
        alert(err)
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