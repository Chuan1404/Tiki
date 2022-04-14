import { call, put, takeLatest } from 'redux-saga/effects';
import { authService, userService } from 'Services';
import { login, setProfile } from 'store/slices/authSlice';

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

function* getProfile(action) {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            const user = yield call(userService.getInfo);
            yield put(setProfile(user))
        }
    } catch (err) {
        alert(err)
    }
}

function* mySaga() {
    yield takeLatest('LOGIN', fetchLogin)
    yield takeLatest('GET_PROFILE', getProfile)
}

export default mySaga;