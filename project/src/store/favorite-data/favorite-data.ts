import { createReducer } from '@reduxjs/toolkit';
import { FavoriteData } from '../../types/state';
import { loadFavoriteOffers } from '../action';

const initialState: FavoriteData = {
  favoriteOffers: null,
};

const favoriteData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload.value;
    });
});

export { favoriteData };
