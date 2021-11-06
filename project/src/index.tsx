import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { setAuthorization } from './store/action';
import { AuthorizationStatus } from './const';

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

(store.dispatch)(checkAuthAction());
(store.dispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
