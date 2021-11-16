import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { makeFakeOffer, makeFakeComment, makeFakeAuthInfo } from '../../utils/mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { divideOffersByCity } from '../../utils/common';

const MAX_OFFERS_COUNT = 2;
const MAX_COMMENTS_COUNT = 2;

const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore =  configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const fakeCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};
const fakeOffers = new Array(MAX_OFFERS_COUNT).fill('').map(() => {
  const offer = makeFakeOffer();

  return { ...offer, city: fakeCity };
});
const fakeOffersDividedByCity = divideOffersByCity(fakeOffers);
const fakeAuthInfo = makeFakeAuthInfo();
const fakeOffer = makeFakeOffer();
const fakeComments = new Array(MAX_COMMENTS_COUNT).fill('').map(() => makeFakeComment());

const store = mockStore({
  APP: {
    city: fakeCity,
    selectedSortingType: 'popular',
  },
  MAIN: {
    offers: fakeOffersDividedByCity,
  },
  FAVORITE: {
    favoriteOffers: new Array(2).fill('').map(() => {
      const offer = makeFakeOffer();

      return { ...offer, city: { name: 'Paris' }, isFavorite: true };
    }),
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    authInfo: fakeAuthInfo,
  },
  OFFER: {
    offer: fakeOffer,
    nearByOffers: fakeOffers,
    comments: fakeComments,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffersDividedByCity[fakeCity.name].length} places to stay in ${fakeCity.name}`)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getAllByText('Sign in')).toHaveLength(2);
  });

  it('should render "Offer" when user navigate to "/offer/:id"', () => {
    history.push(`offer/${fakeOffer.id}`);

    render(fakeApp);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      FAVORITE: {
        favoriteOffers: new Array(2).fill('').map(() => {
          const offer = makeFakeOffer();

          return { ...offer, city: { name: 'Paris' }, isFavorite: true };
        }),
      },
    });

    history.push(AppRoute.Favorites);

    render(
      <Provider store={fakeStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
