import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Location } from '../../types/location';

export const selectLocation = (state: State): Location => state[NameSpace.AppState].location;
export const selectSelectedSortingType = (state: State): string => state[NameSpace.AppState].selectedSortingType;
