import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const selectFavoriteOffers = (state: State): Offer[] => state[NameSpace.FavoriteData].favoriteOffers;
