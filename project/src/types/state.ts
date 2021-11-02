import { Offer, City, AuthInfo } from './types';
import { AuthorizationStatus } from '../const';

export type State = {
  city: City,
  offers: Offer[],
  selectedSortingType: string,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};
