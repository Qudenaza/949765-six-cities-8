import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Location from './location';
import { locations } from '../../const';
import { changeLocation } from '../../store/action';

const mockStore = configureMockStore();
describe('Component: Location', () => {
  it('should render correctly when isActive="true"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Location isActive location={locations[0]} onLocationClick={jest.fn()} />
      </Router>,
    );

    expect(screen.getByText(locations[0].name)).toBeInTheDocument();
    expect(screen.getByText(locations[0].name).parentElement).toHaveClass(
      'locations__item-link tabs__item tabs__item--active',
    );
  });

  it('should render correctly when isActive="false"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Location isActive={false} location={locations[0]} onLocationClick={jest.fn()} />
      </Router>,
    );

    expect(screen.getByText(locations[0].name)).toBeInTheDocument();
    expect(screen.getByText(locations[0].name).parentElement).toHaveClass(
      'locations__item-link tabs__item',
    );
  });

  it('when user click to another location, it should become active', () => {
    const history = createMemoryHistory();
    const handleLocationClick = jest.fn();
    const store = mockStore({
      APP: {
        location: locations[0],
      },
    });

    handleLocationClick.mockImplementation(() => store.dispatch(changeLocation(locations[1])));

    const { rerender } = render(
      <Provider store={store}>
        <Router history={history}>
          <Location isActive location={locations[0]} onLocationClick={handleLocationClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(locations[0].name).parentElement).toHaveClass('tabs__item--active');
    userEvent.click(screen.getByText(locations[0].name));
    expect(handleLocationClick).toBeCalled();

    rerender(
      <Provider store={store}>
        <Router history={history}>
          <Location isActive location={locations[1]} onLocationClick={handleLocationClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(locations[1].name).parentElement).toHaveClass('tabs__item--active');
  });
});
