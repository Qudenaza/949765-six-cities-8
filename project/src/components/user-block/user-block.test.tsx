import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import UserBlock from './user-block';
import { AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: UserBlock', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const authorizationStatus = AuthorizationStatus.Auth;
    const authInfo = makeFakeAuthInfo();

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock authorizationStatus={authorizationStatus} authInfo={authInfo}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();

    expect(screen.getByText(authInfo.email)).toBeInTheDocument();
  });
});
