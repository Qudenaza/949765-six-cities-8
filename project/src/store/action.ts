import { ActionType } from '../types/action';
import { Offer, City, AuthInfo, Comment } from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeCity = (value: City) => ({
  type: ActionType.ChangeCity,
  payload: value,
} as const);

export const loadOffers = (value: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: value,
} as const);

export const loadNearByOffers = (value: Offer[]) => ({
  type: ActionType.LoadNearByOffers,
  payload: value,
} as const);

export const loadOffer = (value: Offer) => ({
  type: ActionType.LoadOffer,
  payload: value,
} as const);

export const loadComments = (value: Comment[]) => ({
  type: ActionType.LoadComments,
  payload: value,
} as const);

export const changeSelectedSortingType = (value: string) => ({
  type: ActionType.ChangeSelectedSortingType,
  payload: value,
} as const);

export const setAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.SetAuthorization,
  payload: authStatus,
} as const);

export const setAuthInfo = (authInfo: AuthInfo) => ({
  type: ActionType.SetAuthInfo,
  payload: authInfo,
} as const);

export const setLogout = () => ({
  type: ActionType.SetLogout,
} as const);

export const redirectBack = () => ({
  type: ActionType.RedirectBack,
} as const);
