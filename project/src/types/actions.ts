import { Offer, City } from './types';

export enum ActionType {
  ChangeCity = 'changeCity',
  GetOffers = 'getOffers',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type GetOffersAction = {
  type: ActionType.GetOffers;
  payload: Offer[],
};

export type Actions = ChangeCityAction | GetOffersAction;
