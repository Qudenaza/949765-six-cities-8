import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/types';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authorizationStatus;
export const selectAuthInfo = (state: State): AuthInfo | null => state[NameSpace.UserProcess].authInfo;
