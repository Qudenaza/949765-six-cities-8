import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Map from './map';
import { makeFakeOffer } from '../../utils/mocks';
import { locations } from '../../const';

const MAX_OFFERS_COUNT = 2;

describe('Component: Map', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const fakeOffers = new Array(MAX_OFFERS_COUNT).fill('').map(() => {
      const fakeOffer = makeFakeOffer();

      return {
        ...fakeOffer,
        city: locations[0],
      };
    });

    const store = mockStore({
      APP: {
        location: locations[0],
      },
    });

    render(
      <Provider store={store}>
        <Map offers={fakeOffers} selectedPoint={0} />
      </Provider>,
    );

    expect(screen.getByText('Leaflet')).toBeInTheDocument();
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
