import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import appSlice from '../reducers/app/app.reducer'
import loginSlice from '../reducers/login/login.reducer'
import firstLoginSlice from '../reducers/first-login/firstlogin.reducer'

const staticReducers = {
  //login: loginSlice,
  //firstLogin: firstLoginSlice,
  app: appSlice,
};

// runSaga is middleware.run function
function createSagaInjector(runSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = key => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  return injectSaga;
}

// Configure the store
export default function configureStore(initialState) {
  // Add sagas middleware
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(createReducer(), initialState, applyMiddleware(sagaMiddleware));

  // Add injectSaga method to our store
  store.injectSaga = createSagaInjector(sagaMiddleware.run);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Return the modified store
  return store;
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}
