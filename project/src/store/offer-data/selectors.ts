import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer, Comment } from '../../types/types';

export const selectOffer = (state: State): Offer | null => state[NameSpace.OfferData].offer;
export const selectNearByOffers = (state: State): Offer[] | null => state[NameSpace.OfferData].nearByOffers;
export const selectComments = (state: State): Comment[] | null => state[NameSpace.OfferData].comments;
