import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const getFavoriteOffers = (state: State): Offer[] | null => state[NameSpace.FavoriteData].favoriteOffers;
