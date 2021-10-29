import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';

const initialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: [],
  selectedSortingType: 'popular',
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload, isDataLoaded: true };
    case ActionType.ChangeSelectedSortingType:
      return { ...state, selectedSortingType: action.payload };
    default:
      return state;
  }
};

export { reducer };
