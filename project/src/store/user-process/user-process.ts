import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { setAuthorization, setAuthInfo } from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  authInfo: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorization, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(setAuthInfo, (state, action) => {
      state.authInfo = action.payload.value;
    });
});

export { userProcess };
