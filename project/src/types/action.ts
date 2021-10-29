import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import { Offer, City } from './types';

export enum ActionType {
  ChangeCity = 'changeCity',
  LoadOffers = 'data/loadOffers',
  ChangeSelectedSortingType = 'changeSelectedSortingType',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type LoadOffersAction = {
  type: ActionType.LoadOffers;
  payload: Offer[],
};

export type ChangeSelectedSortingTypeAction = {
  type: ActionType.ChangeSelectedSortingType,
  payload: string,
}

export type Actions = ChangeCityAction | LoadOffersAction | ChangeSelectedSortingTypeAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
