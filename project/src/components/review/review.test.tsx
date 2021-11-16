import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Review from './review';
import { AuthorizationStatus } from '../../const';
import { makeFakeComment } from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: Review', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const fakeComments = [makeFakeComment()];

    render(
      <Provider store={store}>
        <Review comments={fakeComments}/>
      </Provider>,
    );

    expect(screen.getByText(fakeComments.length)).toBeInTheDocument();
  });
});
