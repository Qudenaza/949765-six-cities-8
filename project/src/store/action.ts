import { ActionType, ChangeCityAction, SetOffersAction, ChangeSelectedSortingTypeAction } from '../types/actions';
import { Offer, City } from '../types/types';

export const changeCity = (value: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: value,
});

export const setOffers = (value: Offer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: value,
});

export const changeSelectedSortingType = (value: string): ChangeSelectedSortingTypeAction => ({
  type: ActionType.ChangeSelectedSortingType,
  payload: value,
});
