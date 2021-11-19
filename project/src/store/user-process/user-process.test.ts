import { userProcess } from './user-process';
import { setAuthorization, setAuthInfo, setLogout } from '../action';
import { AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo } from '../../utils/mocks';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: null,
      });
  });

  it('should update authorization status by given value', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      authInfo: null,
    };

    expect(userProcess(state, setAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: null,
      });
  });

  it('should update authorization info by given value', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      authInfo: null,
    };
    const authInfo = makeFakeAuthInfo();

    expect(userProcess(state, setAuthInfo(authInfo)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo,
      });
  });

  it('should set authorization status to "NO_AUTH" when user logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: null,
    };
    const authorizationStatus = AuthorizationStatus.NoAuth;

    expect(userProcess(state, setLogout(authorizationStatus)))
      .toEqual({
        authorizationStatus,
        authInfo: null,
      });
  });
});
