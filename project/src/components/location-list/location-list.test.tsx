import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import LocationList from './location-list';
import { locations } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LocationList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: {
        location: locations[0],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LocationList />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(screen.getByText(locations[0].name).parentElement).toHaveClass('tabs__item--active');
  });
});
