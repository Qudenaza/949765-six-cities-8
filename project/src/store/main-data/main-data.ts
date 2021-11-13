
import { createReducer } from '@reduxjs/toolkit';
import { MainData } from '../../types/state';
import { setOffers, updateOfferFavoriteStatus } from '../action';

const initialState: MainData = {
  offers: {},
};

const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload.value;
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
