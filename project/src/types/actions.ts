import { Offer, City } from './types';

export enum ActionType {
  ChangeCity = 'changeCity',
  SetOffers = 'setOffers',
  ChangeSelectedSortingType = 'changeSelectedSortingType',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: Offer[],
};

export type ChangeSelectedSortingTypeAction = {
  type: ActionType.ChangeSelectedSortingType,
  payload: string,
}

export type Actions = ChangeCityAction | SetOffersAction | ChangeSelectedSortingTypeAction;
