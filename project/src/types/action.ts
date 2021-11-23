import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  ChangeLocation = 'data/changeLocation',
  SetOffers = 'data/setOffers',
  SetNearByOffers = 'data/setNearByOffers',
  SetFavoriteOffers = 'data/setFavoriteOffers',
  RemoveFavoriteOffer = 'data/removeFavoriteOffer',
  UpdateOfferFavoriteStatus = 'data/updateOfferFavoriteStatus',
  SetOffer = 'data/setOffer',
  SetComments = 'data/setComments',
  SetLoadingStatus = 'data/setLoadingStatus',
  ChangeSelectedSortingType = 'app/changeSelectedSortingType',
  SetAuthorization = 'user/setAuthorization',
  SetLogout = 'user/setLogout',
  SetAuthInfo = 'user/setAuthInfo',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
