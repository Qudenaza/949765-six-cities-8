import { offerData } from './offer-data';
import { setOffer, setNearByOffers, setComments } from '../action';
import { makeFakeOffer, makeFakeComment } from '../../utils/mocks';

describe('Reducer: offerData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        offer: null,
        nearByOffers: null,
        comments: null,
      });
  });

  it('should update offer by load offer', () => {
    const state = {
      offer: null,
      nearByOffers: null,
      comments: null,
    };
    const loadedOffer = makeFakeOffer();

    expect(offerData(state, setOffer(loadedOffer)))
      .toEqual({
        offer: loadedOffer,
        nearByOffers: null,
        comments: null,
      });
  });

  it('should update near by offers by load offers', () => {
    const state = {
      offer: null,
      nearByOffers: null,
      comments: null,
    };
    const loadedOffers = [makeFakeOffer(), makeFakeOffer()];

    expect(offerData(state, setNearByOffers(loadedOffers)))
      .toEqual({
        offer: null,
        nearByOffers: loadedOffers,
        comments: null,
      });
  });

  it('should update comments by load comments', () => {
    const state = {
      offer: null,
      nearByOffers: null,
      comments: null,
    };
    const loadedComments = [makeFakeComment(), makeFakeComment()];

    expect(offerData(state, setComments(loadedComments)))
      .toEqual({
        offer: null,
        nearByOffers: null,
        comments: loadedComments,
      });
  });
});
