import { ThunkActionResult } from '../types/action';
import { loadOffers } from './action';
import { APIRoute } from '../const';
import { ServerOffer } from '../types/types';
import { adaptOfferToClient } from '../adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);

    dispatch(loadOffers(data.map((offer) => adaptOfferToClient(offer))));
  };
