import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import Favorites from './favorites';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, locations } from '../../const';
import { State } from '../../types/state';

const MAX_OFFERS_COUNT = 2;

describe('Component: Favorites', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(
    middlewares,
  );
  const history = createMemoryHistory();

  it('should render correctly when there is favorite offers', async () => {
    const fakeOffers = new Array(MAX_OFFERS_COUNT).fill('').map(() => {
      const offer = makeFakeOffer();

      return {
        ...offer,
        city: locations[0],
        isFavorite: true,
      };
    });

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      FAVORITE: {
        favoriteOffers: fakeOffers,
      },
    });

    history.push('/favorites');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/favorites" exact>
            <Favorites />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(locations[0].name)).toBeInTheDocument();
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getAllByAltText('6 cities logo')).toHaveLength(2);
  });

  it('should render correctly when there is no favorite offers', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      FAVORITE: {
        favoriteOffers: [],
      },
    });

    history.push('/favorites');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/favorites" exact>
            <Favorites />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });
});
