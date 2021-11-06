import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.MainData].isDataLoaded;
