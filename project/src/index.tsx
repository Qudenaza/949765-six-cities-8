import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { checkAuthAction } from './store/api-actions';
import { setAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';

const api = createAPI(() => store.dispatch(setAuthorization(AuthorizationStatus.NoAuth)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuthAction()).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router history={browserHistory}>
          <App />
          <ToastContainer />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'));
});


