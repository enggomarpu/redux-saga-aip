import { takeEvery, put } from "redux-saga/effects";
import { user } from '../../reducers/app/app.reducer';

export function* appSaga(action) {
    let user = JSON.parse(localStorage.getit("user-info"));
    yield put(user(user));
}

export function* appSaga() {
    yield takeEvery(user, appSaga);
}
