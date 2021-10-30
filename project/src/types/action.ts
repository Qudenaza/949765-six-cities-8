import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import { changeCity, loadOffers, changeSelectedSortingType, requireAuthorization, requireLogout, requireAuthInfo } from '../store/action';

export enum ActionType {
  ChangeCity = 'changeCity',
  LoadOffers = 'data/loadOffers',
  ChangeSelectedSortingType = 'changeSelectedSortingType',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RequireAuthInfo = 'user/requireAuthInfo',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof changeSelectedSortingType>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireAuthInfo>
  | ReturnType<typeof requireLogout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
