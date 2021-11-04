import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from './services/api';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { setAuthorization } from './store/action';
import { redirect } from './store/middlewares/redirect';
import { ThunkAppDispatch } from './types/action';
import { AuthorizationStatus } from './const';

const api = createAPI(() => store.dispatch(setAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
