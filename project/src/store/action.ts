import { ActionType, ChangeCityAction, LoadOffersAction, ChangeSelectedSortingTypeAction } from '../types/action';
import { Offer, City } from '../types/types';

export const changeCity = (value: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: value,
});

export const loadOffers = (value: Offer[]): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: value,
});

export const changeSelectedSortingType = (value: string): ChangeSelectedSortingTypeAction => ({
  type: ActionType.ChangeSelectedSortingType,
  payload: value,
});
