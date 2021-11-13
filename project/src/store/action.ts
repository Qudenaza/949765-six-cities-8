import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { GroupedByCityOffers, Offer, City, AuthInfo, Comment } from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction(ActionType.ChangeCity, (value: City) => ({
  payload: {
    value,
  },
}));

export const setOffers = createAction(ActionType.SetOffers, (value: GroupedByCityOffers) => ({
  payload: {
    value,
  },
}));

export const setNearByOffers = createAction(ActionType.SetNearByOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const setFavoriteOffers = createAction(ActionType.SetFavoriteOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const removeFromFavorites = createAction(ActionType.RemoveFavoriteOffer, (value: number) => ({
  payload: {
    value,
  },
}));

export const updateOfferFavoriteStatus = createAction(ActionType.UpdateOfferFavoriteStatus, (value: Offer) => ({
  payload: {
    value,
  },
}));

export const setOffer = createAction(ActionType.SetOffer, (value: Offer) => ({
  payload: {
    value,
  },
}));

export const setComments = createAction(ActionType.SetComments, (value: Comment[]) => ({
  payload: {
    value,
  },
}));

export const changeSelectedSortingType = createAction(ActionType.ChangeSelectedSortingType, (value: string) => ({
  payload: {
    value,
  },
}));

export const setAuthorization = createAction(ActionType.SetAuthorization, (value: AuthorizationStatus) => ({
  payload: {
    value,
  },
}));

export const setAuthInfo = createAction(ActionType.SetAuthInfo, (value: AuthInfo) => ({
  payload: {
    value,
  },
}));

export const setLogout = createAction(ActionType.SetLogout, (value: AuthorizationStatus) => ({
  payload: {
    value,
  },
}));

