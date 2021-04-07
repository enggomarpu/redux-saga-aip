import { takeEvery, put, all } from "redux-saga/effects";
import axios from 'axios';
import httpService from "../../shared/http.service";
import {
  login,
  loginSuccess,
  error
} from '../../reducers/login/login.reducer'

 export function* loginSaga(action) {
   console.log('login saga celled')
  const data = {
    username: action.payload.username, 
    password: action.payload.password
  };
  console.log('login reducer called', action)
  try {
    const response = yield axios.post('http://dev-affiliate.aipartnershipscorp.com:8081/login', data);
    yield put(loginSuccess(response));
  } catch (err) {
    yield put(error());
  }
}

export function* loginRootSaga() {
  yield all([
    takeEvery(login, loginSaga)
  ]);
}
  