import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import Offer from './offer';
import { makeFakeComment, makeFakeOffer } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, locations } from '../../const';
import { State } from '../../types/state';

const MAX_OFFERS_COUNT = 2;
const MAX_COMMENTS_COUNT = 2;

describe('Component: Offer', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(
    middlewares,
  );
  const history = createMemoryHistory();

  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();
    const fakeComments = new Array(MAX_COMMENTS_COUNT).fill('').map(() => makeFakeComment());
    const fakeNearByOffers = new Array(MAX_OFFERS_COUNT).fill('').map(() => makeFakeOffer());

    const store = mockStore({
      APP: {
        location: locations[0],
        selectedSortingType: 'popular',
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      OFFER: {
        offer: fakeOffer,
        comments: fakeComments,
        nearByOffers: fakeNearByOffers,
      },
    });

    history.push(`/offer/${fakeOffer.id}`);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Offer} exact>
            <Offer />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText('Rating')).toHaveLength(5);
    expect(screen.getByText(`${fakeOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakeOffer.maxAdults} adults`)).toBeInTheDocument();
  });

  it('should render correctly when there is no offer', async () => {
    const store = mockStore({
      APP: {
        location: locations[0],
        selectedSortingType: 'popular',
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      OFFER: {
        offer: null,
      },
    });

    history.push('/offer/21');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.Offer} exact>
            <Offer />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
