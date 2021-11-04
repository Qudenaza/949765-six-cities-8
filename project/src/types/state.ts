import { Offer, City, AuthInfo, Comment } from './types';
import { AuthorizationStatus } from '../const';

export type State = {
  city: City,
  offers: Offer[] | [],
  nearByOffers: Offer[] | [],
  favoriteOffers: Offer[] | [],
  comments: Comment[] | [],
  offer: Offer | null,
  selectedSortingType: string,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};
