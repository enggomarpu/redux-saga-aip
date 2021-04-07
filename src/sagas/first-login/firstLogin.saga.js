import { takeEvery, put, all } from "redux-saga/effects";
import axios from 'axios';
//import httpService from "../../shared/http.service";

import { firstLogin, firstLoginSuccess, firstLoginFail } from "../../reducers/first-login/firstlogin.reducer";

 export function* firstLoginSaga(action) {
  //console.log('firstloginn saga called', action.payload);
  const data = {
    username: action.payload.username, 
    password: action.payload.password
  };
  try {
    const response = yield axios.post('http://dev-affiliate.aipartnershipscorp.com:8081/user/verify-token/', action.payload);
    console.log('success called');

    yield put(firstLoginSuccess());
    //console.log(response);
  } catch (err) {
    console.log('error called');
    yield put(firstLoginFail());
  }
}

export function* firstLoginRootSaga() {
  yield all([
    takeEvery(firstLogin, firstLoginSaga)
  ]);
}
  