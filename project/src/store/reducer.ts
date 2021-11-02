import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';
import { AuthorizationStatus } from '../const';

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
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload, isDataLoaded: true };
    case ActionType.ChangeSelectedSortingType:
      return { ...state, selectedSortingType: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.RequireAuthInfo:
      return { ...state, authInfo: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth, authInfo: initialState.authInfo };
    default:
      return state;
  }
};

export { reducer };
