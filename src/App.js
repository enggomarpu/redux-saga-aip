import React, { lazy } from "react";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import AllSet from "./components/CreateProfile/AllSet";
import InterestsExpertise from "./components/CreateProfile/InterestsExpertise";
import Affiliates from "./components/Affiliates/Affiliates";
import DashboardComponent from "./components/dashboard/dashboard.component";
import BasicTable from "./components/ReactTable/BasicTable";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "react-confirm-alert/src/react-confirm-alert.css";
import basictable from "./components/ReactTable/BasicTable";
import EventCalendar from "./components/dashboard/Event/event-calendar.component";
import MyHub from "./components/knowledge-hub/my-hub.component";
import initStore from './store/store';
import { Provider } from "react-redux";
//import FirstLoginComponent from "./components/authentication/login/first-login.component";
const store = initStore();

const LoginComponent = lazy(() =>
  import('./modules/login/login.module').then(module => {
    store.injectReducer('login', module.default.reducer);
    store.injectSaga('login', module.default.saga);
    return import('./components/authentication/login/login.component');
  })
);

const VerifyOtpComponent = lazy(() =>
  import('./modules/verify-otp/verifyOtp.module').then(module => {
    store.injectReducer('verifyOtp', module.default.reducer);
    store.injectSaga('verifyOtp', module.default.saga);
    return import('./components/authentication/verify-otp/verifyOtp.component');
  })
);

const FirstLoginComponent = lazy(() =>
  import('./modules/first-login/firstlogin.module').then(module => {
    store.injectReducer('firstLogin', module.default.reducer);
    store.injectSaga('firstLoginRootSaga', module.default.saga);
    return import('./components/authentication/login/first-login.component');
  })
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <ToastProvider autoDismiss={true}>
            <React.Suspense fallback="loading...">
              <Route exact path="/" component={LoginComponent} />
              <Route exact path="/verify-otp/:email" component={VerifyOtpComponent} />
              <Route exact path="/firstlogin/:token" component={FirstLoginComponent} />
              <Route exact path="/create-profile" component={CreateProfile} />
              <Route exact path="/allset" component={AllSet} />
              <Route exact path="/basictable" component={basictable} />
              <Route exact path="/interestsexpertise" component={InterestsExpertise} />
              <Route exact path="/affiliates" component={Affiliates} />
              <Route exact path="/basictable" component={BasicTable} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/dashboard" component={DashboardComponent} />
              <Route exact path="/calendar" component={EventCalendar} />
              <Route exact path="/knowledgeHub/myhub" component={MyHub} />
            </React.Suspense>
          </ToastProvider>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
