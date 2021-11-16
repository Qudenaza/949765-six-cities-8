import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import OfferCard from './offer-card';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const fakeOffer = makeFakeOffer();

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferCard offer={fakeOffer} isNearby={false}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
