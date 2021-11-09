import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Offers, Offer, City, AuthInfo, Comment } from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction(ActionType.ChangeCity, (value: City) => ({
  payload: {
    value,
  },
}));

export const loadOffers = createAction(ActionType.LoadOffers, (value: Offers) => ({
  payload: {
    value,
  },
}));

export const loadNearByOffers = createAction(ActionType.LoadNearByOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const loadFavoriteOffers = createAction(ActionType.LoadFavoriteOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const loadOffer = createAction(ActionType.LoadOffer, (value: Offer) => ({
  payload: {
    value,
  },
}));

export const loadComments = createAction(ActionType.LoadComments, (value: Comment[]) => ({
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

export const setLogout = createAction(ActionType.SetLogout);


