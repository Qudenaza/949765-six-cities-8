import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import SignIn from './sign-in';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

describe('Component: Offer', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(
    middlewares,
  );
  const history = createMemoryHistory();

  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.SignIn} exact>
            <SignIn />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText('Sign in')).toHaveLength(2);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should redirect to root page when user is authorized', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Offer} exact>
              <SignIn />
            </Route>
            <Route path={AppRoute.Root} exact>
              <h1>This is a root page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is a root page')).toBeInTheDocument();
  });
});
