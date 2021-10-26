import { Offer, City } from './types';

export enum ActionType {
  ChangeCity = 'changeCity',
  SetOffers = 'setOffers',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: Offer[],
};

export type Actions = ChangeCityAction | SetOffersAction;
