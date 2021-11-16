import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Sorting from './sorting';

const mockStore = configureMockStore();

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: {
        selectedSortingType: 'popular',
      },
    });

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>,
    );

    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
  });
});
