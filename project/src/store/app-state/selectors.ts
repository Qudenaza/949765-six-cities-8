import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { City } from '../../types/types';

export const getCity = (state: State): City => state[NameSpace.AppState].city;
export const getSelectedSortingType = (state: State): string => state[NameSpace.AppState].selectedSortingType;
