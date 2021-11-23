import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const selectOffers = (city: string) => (state: State): Offer[] => state[NameSpace.MainData].offers[city];
export const selectDataLoadedStatus =  (state: State): boolean => state[NameSpace.MainData].isDataLoaded;
