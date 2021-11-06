import { createReducer } from '@reduxjs/toolkit';
import { MainData } from '../../types/state';
import { loadOffers } from '../action';

const initialState: MainData = {
  offers: {},
  isDataLoaded: false,
};

const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload.value;
      state.isDataLoaded = true;
    });
});

export { mainData };
