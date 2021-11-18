import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoriteList from './favorite-list';
import { makeFakeOffer } from '../../../utils/mocks';
import { AuthorizationStatus, locations } from '../../../const';

const MAX_OFFERS_COUNT = 2;

const mockStore = configureMockStore();

describe('Component: FavoriteList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
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

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteList favoriteOffers={fakeOffers} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(locations[0].name)).toBeInTheDocument();
    expect(screen.getAllByAltText('Place')).toHaveLength(2);
  });
});
