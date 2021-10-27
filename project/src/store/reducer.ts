import { State } from '../types/state';
import { ActionType, Actions } from '../types/actions';
import { offers } from '../mocks/offers';

const initialState = {
  city: {
    title: 'Paris',
    lat: 48.864716,
    lng: 2.349014,
    zoom: 10,
  },
  offers,
  selectedSortingType: 'popular',
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.SetOffers:
      return { ...state, offers: action.payload };
    case ActionType.ChangeSelectedSortingType:
      return { ...state, selectedSortingType: action.payload };
    default:
      return state;
  }
};

export { reducer };
