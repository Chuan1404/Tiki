import { call, put } from "redux-saga/effects";
import { authService } from "services";
import { login } from "store/slices/authSlice";

export function* fetchLogin(action) {
    try {
        const res = yield call(authService.login, action.payload)
        if (!res.error) {
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
export function* fetchRegister(action) {
    try {
        const res = yield call(authService.register, action.payload)
        if (!res.error) {
            console.log("action.payload", action.payload)
            yield put({
                type: 'LOGIN',
                payload: {
                    email: action.payload.email,
                    password: action.payload.password,
                    role: action.payload.role
                }
            })
        }
        else {
            alert(res.error)
        }
    } catch (err) {
        console.log(err)
    }
}