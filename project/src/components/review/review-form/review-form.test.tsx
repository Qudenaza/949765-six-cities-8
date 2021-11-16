import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ReviewForm from './review-form';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByText('50 characters')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
