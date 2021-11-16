import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CityList from './city-list';
import { cities } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CityList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <CityList onCityChange={jest.fn()}/>
        </Router>
      </Provider>,
    );

    cities.forEach((city) => expect(screen.getByText(city.name)).toBeInTheDocument());

    expect(screen.getByText(cities[0].name).parentElement).toHaveClass('tabs__item--active');
  });
});
