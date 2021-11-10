import { createReducer } from '@reduxjs/toolkit';
import { FavoriteData } from '../../types/state';
import { loadFavoriteOffers, removeFromFavorites } from '../action';

const initialState: FavoriteData = {
  favoriteOffers: [],
};

const favoriteData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload.value;
    })
    .addCase(removeFromFavorites, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.value);
    });
});

export { favoriteData };
