import { appState } from './app-state';
import { changeCity, changeSelectedSortingType } from '../action';

describe('Reducer: appState', () => {
  it('without additional parameters should return initial state', () => {
    expect(appState(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13,
          },
        },
        selectedSortingType: 'popular',
      });
  });

  it('should change city to a given value', () => {
    const state = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      selectedSortingType: 'popular',
    };
    const city = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };

    expect(appState(state, changeCity(city)))
      .toEqual({
        city,
        selectedSortingType: 'popular',
      });
  });

  it('should change selecting sorting type to a given value', () => {
    const state = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      selectedSortingType: 'popular',
    };

    expect(appState(state, changeSelectedSortingType('low')))
      .toEqual({
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13,
          },
        },
        selectedSortingType: 'low',
      });
  });
});
