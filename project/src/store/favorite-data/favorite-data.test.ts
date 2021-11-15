import { favoriteData } from './favorite-data';
import { setFavoriteOffers, removeFromFavorites } from '../action';
import { makeFakeOffer } from '../../utils/mocks';

describe('Reducer: favoriteData', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoriteData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ favoriteOffers: [] });
  });

  it('should update favorite offers by load favorite offers', () => {
    const state = {
      favoriteOffers: [],
    };
    const loadedOffers = [makeFakeOffer(), makeFakeOffer()];


    expect(favoriteData(state, setFavoriteOffers(loadedOffers)))
      .toEqual({ favoriteOffers: loadedOffers });
  });

  it('should remove offer from favorite list', () => {
    const firstOffer = makeFakeOffer();
    const secondOffer = makeFakeOffer();

    const state = {
      favoriteOffers: [firstOffer, secondOffer],
    };

    expect(favoriteData(state, removeFromFavorites(firstOffer.id)))
      .toEqual({ favoriteOffers: [secondOffer] });
  });
});
