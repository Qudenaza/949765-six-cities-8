import { GroupedByCityOffers, Offer, City, AuthInfo, Comment } from './types';
import { RootState } from '../store/root-reducer';
import { AuthorizationStatus } from '../const';

export type MainData = {
  offers: GroupedByCityOffers,
};

export type OfferData = {
  offer: Offer | null,
  nearByOffers: Offer[] | null,
  comments: Comment[] | null,
};

export type FavoriteData = {
  favoriteOffers: Offer[],
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo | null,
};


export type AppState = {
  city: City,
  selectedSortingType: string,
};

export type State = RootState;
