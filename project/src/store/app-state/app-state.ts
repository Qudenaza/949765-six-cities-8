import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { changeCity, changeSelectedSortingType } from '../action';

const initialState: AppState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  selectedSortingType: 'popular',
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.value;
    })
    .addCase(changeSelectedSortingType, (state, action) => {
      state.selectedSortingType = action.payload.value;
    });
});

export { appState };
