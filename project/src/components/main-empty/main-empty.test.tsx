import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MainEmpty from './main-empty';
import { locations } from '../../const';

const mockStore = configureMockStore();
describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: {
        location: locations[0],
      },
    });

    render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText('We could not find any property available at the moment in Paris'),
    ).toBeInTheDocument();
  });
});
