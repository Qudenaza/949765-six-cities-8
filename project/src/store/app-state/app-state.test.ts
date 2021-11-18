import { appState } from './app-state';
import { changeLocation, changeSelectedSortingType } from '../action';
import { locations } from '../../const';

describe('Reducer: appState', () => {
  it('without additional parameters should return initial state', () => {
    expect(appState(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        location: locations[0],
        selectedSortingType: 'popular',
      });
  });

  it('should change city to a given value', () => {
    const state = {
      location: locations[0],
      selectedSortingType: 'popular',
    };

    expect(appState(state, changeLocation(locations[1])))
      .toEqual({
        location: locations[1],
        selectedSortingType: 'popular',
      });
  });

  it('should change selecting sorting type to a given value', () => {
    const state = {
      location: locations[0],
      selectedSortingType: 'popular',
    };

    expect(appState(state, changeSelectedSortingType('low')))
      .toEqual({
        location: locations[0],
        selectedSortingType: 'low',
      });
  });
});
