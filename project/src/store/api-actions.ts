import { ThunkActionResult } from '../types/action';
import { ServerOffer } from '../types/types';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { loadOffers, requireAuthInfo, requireAuthorization, requireLogout } from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { adaptOfferToClient, adaptAuthInfoToClient } from '../adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);

    dispatch(loadOffers(data.map((offer) => adaptOfferToClient(offer))));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(requireAuthInfo(adaptAuthInfoToClient(response.data)));
      });
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(APIRoute.Login, { email, password });

    saveToken(data.token);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(requireAuthInfo(adaptAuthInfoToClient(data)));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);

    dropToken();

    dispatch(requireLogout());
  };
