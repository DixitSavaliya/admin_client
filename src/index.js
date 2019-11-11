import React from 'react';
import ReactDOM from 'react-dom';;
import { unregister } from './registerServiceWorker';
import { Router, Link, Route } from "react-router-dom";
import './assets/base.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import history from './history';
import LogIn from './Layout/login/login';
import ForgotPassword from './Layout/forgotpassword/forgotpassword';
import ResetPassword from './Layout/resetpassword/resetpassword';
import WithAuth from './auth.js'

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {localStorage.getItem('token') ? (
          <div>
            <Component />
          </div>
        ) : (
            <div>
              <Route exact path="/" component={LogIn} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/resetpassword/:hash" component={ResetPassword} />
            </div>
          )
        }
      </Router>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./DemoPages/Main', () => {
    const NextApp = require('./DemoPages/Main').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();

