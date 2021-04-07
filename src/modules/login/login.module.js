import loginSlice from '../../reducers/login/login.reducer'
import { loginRootSaga } from "../../sagas/login/login.saga";

export default {
    reducer: loginSlice,
    saga: loginRootSaga
};