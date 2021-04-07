import firstLoginSlice from '../../reducers/first-login/firstlogin.reducer'
import { firstLoginRootSaga } from "../../sagas/first-login/firstLogin.saga";

export default {
    reducer: firstLoginSlice,
    saga: firstLoginRootSaga
};