import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import OfferList from './offer-list';
import { makeFakeOffer } from '../../utils/mocks';
import { divideOffersByLocation } from '../../utils/common';
import { AuthorizationStatus, locations } from '../../const';

const MAX_OFFERS_COUNT = 2;

describe('Component: OfferList', () => {
  const mockStore = configureMockStore();
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
      MAIN: {
        offers: groupedByCityOffers,
      },
      APP: {
        location: locations[0],
        selectedSortingType: 'popular',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferList offers={fakeOffers} />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText('To bookmarks')).toHaveLength(2);
  });
});
