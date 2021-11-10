import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  ChangeCity = 'data/changeCity',
  LoadOffers = 'data/loadOffers',
  LoadNearByOffers = 'data/loadNearByOffers',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  RemoveFavoriteOffer = 'data/removeFavoriteOffer',
  UpdateOfferFavoriteStatus = 'data/updateOfferFavoriteStatus',
  LoadOffer = 'data/loadOffer',
  LoadComments = 'data/loadComments',
  ChangeSelectedSortingType = 'app/changeSelectedSortingType',
  SetAuthorization = 'user/setAuthorization',
  SetLogout = 'user/setLogout',
  SetAuthInfo = 'user/setAuthInfo',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
