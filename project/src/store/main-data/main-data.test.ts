import { mainData } from './main-data';
import { setOffers, updateOfferFavoriteStatus } from '../action';
import { makeFakeOffer } from '../../utils/mocks';

describe('Reducer: mainData', () => {
  it('without additional parameters should return initial state', () => {
    expect(mainData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ offers: {} });
  });

  it('should update offers by load offers', () => {
    const state = {
      offers: {},
    };
    const loadedOffers = {
      'Paris': [makeFakeOffer(), makeFakeOffer()],
    };

    expect(mainData(state, setOffers(loadedOffers)))
      .toEqual({ offers: loadedOffers });
  });

  it('should update offer favorite status', () => {
    const offer = makeFakeOffer();
    const state = {
      offers: {
        [offer.city.name]: [offer],
      },
    };

    expect(mainData(state, updateOfferFavoriteStatus(offer)))
      .toEqual({
        offers: {
          [offer.city.name]: [{
            ...offer,
            isFavorite: !offer.isFavorite,
          }]
        }
      });
  });
});
