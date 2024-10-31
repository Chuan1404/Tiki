const { call, put } = require("redux-saga/effects");
const { orderService } = require("services");
const { setOrder } = require("store/slices/orderSlice");

export function* getOrder() {
    try {
        const res = yield call(orderService.getAllOrder)
        if (res.data) {
            yield put(setOrder(res))
        }
    } catch (err) {
        console.log(err)
    }
}

export function* postOrder(action) {
    try {
        const res = yield call(orderService.order, action.payload);
        if (res.data) {
            yield put({ type: 'GET_ORDER' })
        } else if (res.err) {
            console.log(res.err)
        }
    } catch (err) {
        console.log(err)
    }
}