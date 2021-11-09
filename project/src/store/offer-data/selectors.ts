import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer, Comment } from '../../types/types';

export const getOffer = (state: State): Offer | null => state[NameSpace.OfferData].offer;
export const getNearByOffers = (state: State): Offer[] | null => state[NameSpace.OfferData].nearByOffers;
export const getComments = (state: State): Comment[] | null => state[NameSpace.OfferData].comments;
