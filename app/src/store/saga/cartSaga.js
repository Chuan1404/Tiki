const { put, call } = require("redux-saga/effects");
const { cartService } = require("services");
const { setCart } = require("store/slices/cartSlice");
const { callApiWithToken } = require("utils");

export function* addCart(action) {
    try {
        const carts = yield call(cartService.addCart, action.payload.productId, action.payload.quantity);
        yield put(setCart(carts.data))
    } catch (err) {
        console.log(err)
    }
}

export function* getCart() {
    try {
        const carts = yield call(cartService.getCart);
        yield put(setCart(carts.data))
    } catch (err) {
        console.log(err)
    }
}

export function* updateCart(action) {
    try {
        const update = yield callApiWithToken(cartService.updateCart, action.payload.id, action.payload.quantity)
        if (update.data) {
            yield put({
                type: 'GET_CART'
            })
        }
    } catch (err) {
        console.log(err)
    }
}
export function* removeCart(action) {
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
export function* removeCarts(action) {
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