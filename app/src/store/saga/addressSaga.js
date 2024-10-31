import { put } from "redux-saga/effects"

const { update } = require("store/slices/addressSlice")
const { closeAddress } = require("store/slices/pageSlice")

export function* updateArress(action) {
    try {
        yield put(update(action.payload))
        yield put(closeAddress())
    } catch (err) {
        console.log(err)
    }
}
