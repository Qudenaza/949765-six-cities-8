import { ActionType } from '../types/action';
import { Offer, City, AuthInfo } from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeCity = (value: City) => ({
  type: ActionType.ChangeCity,
  payload: value,
} as const);

export const loadOffers = (value: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: value,
} as const);

export const changeSelectedSortingType = (value: string) => ({
  type: ActionType.ChangeSelectedSortingType,
  payload: value,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireAuthInfo = (authInfo: AuthInfo) => ({
  type: ActionType.RequireAuthInfo,
  payload: authInfo,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
