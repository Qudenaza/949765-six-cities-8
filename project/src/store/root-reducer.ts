import { combineReducers } from 'redux';
import { mainData } from './main-data/main-data';
import { offerData } from './offer-data/offer-data';
import { favoriteData } from './favorite-data/favorite-data';
import { userProcess } from './user-process/user-process';
import { appState } from './app-state/app-state';

export enum NameSpace {
  MainData = 'MAIN',
  OfferData = 'OFFER',
  FavoriteData = 'FAVORITE',
  UserProcess = 'USER',
  AppState = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.MainData]: mainData,
  [NameSpace.OfferData]: offerData,
  [NameSpace.FavoriteData]: favoriteData,
  [NameSpace.UserProcess]: userProcess,
  [NameSpace.AppState]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
