import { ThunkActionResult } from '../types/action';
import { ServerOffer, ServerComment, CommentPostType } from '../types/types';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { setOffers, setNearByOffers, setFavoriteOffers, setOffer, setComments, setAuthInfo, setAuthorization, setLogout, updateOfferFavoriteStatus } from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { adaptServerOfferToClient, adaptAuthInfoToClient, adaptServerCommentToClient } from '../adapter';
import { divideOffersByCity } from '../utils/common';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
    const adaptedOffers = data.map((offer) => adaptServerOfferToClient(offer));

    dispatch(setOffers(divideOffersByCity(adaptedOffers)));
  };

export const fetchNearByOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${id}/nearby`);

    dispatch(setNearByOffers(data.map((offer) => adaptServerOfferToClient(offer))));
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Favorite);
    const adaptedOffers = data.map((offer) => adaptServerOfferToClient(offer));

    dispatch(setFavoriteOffers(adaptedOffers));
  };

export const fetchOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);

    dispatch(setOffer(adaptServerOfferToClient(data)));
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerComment[]>(`${APIRoute.Comments}/${id}`);

    dispatch(setComments(data.map((comment) => adaptServerCommentToClient(comment))));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        if (response) {
          dispatch(setAuthorization(AuthorizationStatus.Auth));
          dispatch(setAuthInfo(adaptAuthInfoToClient(response.data)));
        }
      });
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(APIRoute.Login, { email, password });

    saveToken(data.token);

    dispatch(setAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthInfo(adaptAuthInfoToClient(data)));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);

    dropToken();

    dispatch(setLogout(AuthorizationStatus.NoAuth));
  };

export const postCommentAction = (id: number, commentData: CommentPostType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<ServerComment[]>(`${APIRoute.Comments}/${id}`, commentData);

    dispatch(setComments(data.map((comment) => adaptServerCommentToClient(comment))));
  };

export const postFavoriteStatusAction = (id: number, status: number, isSingleOffer = false): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(`${APIRoute.Favorite}/${id}/${status}`);

    isSingleOffer && dispatch(setOffer(adaptServerOfferToClient(data)));

    !isSingleOffer && dispatch(updateOfferFavoriteStatus(adaptServerOfferToClient(data)));
  };

