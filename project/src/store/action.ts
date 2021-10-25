import { ActionType, ChangeCityAction, GetOffersAction } from '../types/actions';
import { Offer, City } from '../types/types';

export const changeCity = (value: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: value,
});

export const getOffers = (value: Offer[]): GetOffersAction => ({
  type: ActionType.GetOffers,
  payload: value,
});
