import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { changeLocation, changeSelectedSortingType } from '../action';
import { locations } from '../../const';

const initialState: AppState = {
  location: locations[0],
  selectedSortingType: 'popular',
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.location = action.payload.location;
    })
    .addCase(changeSelectedSortingType, (state, action) => {
      state.selectedSortingType = action.payload.value;
    });
});

export { appState };
