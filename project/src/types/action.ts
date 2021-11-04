import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import { changeCity, loadOffers, loadNearByOffers, loadOffer, loadComments, changeSelectedSortingType, setAuthorization, setLogout, setAuthInfo, redirectBack } from '../store/action';

export enum ActionType {
  ChangeCity = 'data/changeCity',
  LoadOffers = 'data/loadOffers',
  LoadNearByOffers = 'data/loadNearByOffers',
  LoadOffer = 'data/loadOffer',
  LoadComments = 'data/loadComments',
  ChangeSelectedSortingType = 'app/changeSelectedSortingType',
  SetAuthorization = 'user/setAuthorization',
  SetLogout = 'user/setLogout',
  SetAuthInfo = 'user/setAuthInfo',
  RedirectBack = 'app/redirectBack',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadNearByOffers>
  | ReturnType<typeof loadOffer>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof changeSelectedSortingType>
  | ReturnType<typeof setAuthorization>
  | ReturnType<typeof setAuthInfo>
  | ReturnType<typeof setLogout>
  | ReturnType<typeof redirectBack>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
