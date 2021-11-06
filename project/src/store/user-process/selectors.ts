import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo | null => state[NameSpace.UserProcess].authInfo;
