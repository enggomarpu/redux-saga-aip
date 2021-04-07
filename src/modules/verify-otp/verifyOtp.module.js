import verifyOTPSlice from '../../reducers/verify-otp/verifyOtp.reducer'
import { verifyOTPRootSaga } from "../../sagas/verify-otp/verifyOtp.saga";

export default {
    reducer: verifyOTPSlice,
    saga: verifyOTPRootSaga
};