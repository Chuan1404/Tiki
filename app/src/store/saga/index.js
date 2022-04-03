import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from 'Services';
import { login } from 'store/slices/loginSlice';

function* fetchLogin(action) {
    try {
        const data = yield call(authService.login, action.payload)
        yield put(login(data));
    } catch (err) {
        alert(err)
    }
}

function* mySaga() {
    yield takeLatest('LOGIN', fetchLogin)
}

export default mySaga;