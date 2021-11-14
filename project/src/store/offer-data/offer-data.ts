import { createReducer } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { setOffer, setNearByOffers, setComments } from '../action';

const initialState: OfferData = {
  offer: null,
  nearByOffers: null,
  comments: null,
};

const offerData = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload.value;
    })
    .addCase(setNearByOffers, (state, action) => {
      state.nearByOffers = action.payload.value;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload.value;
    });
});

export { offerData };
