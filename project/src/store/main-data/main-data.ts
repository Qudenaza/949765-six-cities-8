import { createReducer } from '@reduxjs/toolkit';
import { MainData } from '../../types/state';
import { loadOffers, updateOfferFavoriteStatus } from '../action';

const initialState: MainData = {
  offers: {},
  isDataLoaded: false,
};

const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload.value;
      state.isDataLoaded = true;
    })
    .addCase(updateOfferFavoriteStatus, (state, action) => {
      const city = action.payload.value.city.name;
      const updatedOffers = state.offers[city].map((offer) => {
        if (offer.id === action.payload.value.id) {
          return {
            ...offer,
            isFavorite: !offer.isFavorite,
          };
        }

        return offer;
      });

      state.offers = {
        ...state.offers,
        [city]: updatedOffers,
      };
    });
});

export { mainData };
