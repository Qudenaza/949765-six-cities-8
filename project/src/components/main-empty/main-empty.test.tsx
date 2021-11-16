import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
describe('Component: MainEmpty', () => {
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
        <MainEmpty />
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});
