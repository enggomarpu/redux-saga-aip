import { takeEvery, put, all } from "redux-saga/effects";
import axios from 'axios';
import httpService from "../../shared/http.service";
import {
  verifyOTP,
  verifyOTPSuccess,
  resendOTP,
  resendOTPSuccess,
  error
} from '../../reducers/verify-otp/verifyOtp.reducer'


export function* verifyOTPSaga(action) {
  const data = {
    Email: action.payload.Email,
    VerificationCode: parseInt(action.payload.VerificationCode)
  };
  try {
    const response = yield axios.post('http://dev-affiliate.aipartnershipscorp.com:8081/verify-two-factor', data);
    yield put(verifyOTPSuccess(response));
  } catch (err) {
    yield put(error());
  }
}

export function* resendOTPSaga(action) {
  const data = {
    Email: action.payload.Email
  };
  try {
    const response = yield axios.post('http://dev-affiliate.aipartnershipscorp.com:8081/resend-two-factor', data);
    yield put(resendOTPSuccess(response));
  } catch (err) {
    yield put(error());
  }
}


export function* verifyOTPRootSaga() {
  yield all([
    takeEvery(verifyOTP, verifyOTPSaga),
    takeEvery(resendOTP, resendOTPSaga)
  ]);
}
  