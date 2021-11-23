import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import Main from './main';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, locations } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import { State } from '../../types/state';
import { divideOffersByLocation } from '../../utils/common';

const MAX_OFFERS_COUNT = 2;

describe('Component: Main', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
  const history = createMemoryHistory();

  it('should render correctly when there is offers', async () => {
    const fakeOffers = new Array(MAX_OFFERS_COUNT).fill('').map(() => {
      const fakeOffer = makeFakeOffer();

      return {
        ...fakeOffer,
        city: locations[0],
      };
    });
    const groupedByCityOffers = divideOffersByLocation(fakeOffers);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      APP: {
        location: locations[0],
        selectedSortingType: 'popular',
      },
      MAIN: {
        offers: groupedByCityOffers,
        isDataLoaded: true,
      },
    });

    await store.dispatch(fetchOffersAction());

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(`${groupedByCityOffers[locations[0].name].length} places to stay in ${locations[0].name}`)).toBeInTheDocument();
  });

  it('should render correctly when there is no offers', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      APP: {
        location: locations[0],
        selectedSortingType: 'popular',
      },
      MAIN: {
        offers: {},
      },
    });

    await store.dispatch(fetchOffersAction());

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
