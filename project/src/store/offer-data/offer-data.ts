import { createReducer } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { loadOffer, loadNearByOffers, loadComments } from '../action';

const initialState: OfferData = {
  offer: null,
  nearByOffers: null,
  comments: null,
};

const offerData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload.value;
    })
    .addCase(loadNearByOffers, (state, action) => {
      state.nearByOffers = action.payload.value;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload.value;
    });
});

export { offerData };
