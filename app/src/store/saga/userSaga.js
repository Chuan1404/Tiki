const { put, call } = require("redux-saga/effects");
const { userService } = require("services");
const { setProfile } = require("store/slices/authSlice");

export function* getProfile() {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            const response = yield call(userService.getInfo);
            yield put(setProfile(response.data))
            yield put({ type: 'GET_CART' })
        }
    } catch (err) {
        console.log(err)
    }
}