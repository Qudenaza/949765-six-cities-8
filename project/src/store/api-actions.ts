import { ThunkActionResult } from '../types/action';
import { ServerOffer, ServerComment, CommentPostType } from '../types/types';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { loadOffers, loadNearByOffers, loadOffer, loadComments, setAuthInfo, setAuthorization, setLogout, redirectBack } from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { adaptServerOfferToClient, adaptAuthInfoToClient, adaptServerCommentToClient } from '../adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);

    dispatch(loadOffers(data.map((offer) => adaptServerOfferToClient(offer))));
  };

export const fetchNearByOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${id}/nearby`);

    dispatch(loadNearByOffers(data.map((offer) => adaptServerOfferToClient(offer))));
  };

export const fetchOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);

    dispatch(loadOffer(adaptServerOfferToClient(data)));
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerComment[]>(`${APIRoute.Comments}/${id}`);

    dispatch(loadComments(data.map((comment) => adaptServerCommentToClient(comment))));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        dispatch(setAuthorization(AuthorizationStatus.Auth));
        dispatch(setAuthInfo(adaptAuthInfoToClient(response.data)));
      });
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(APIRoute.Login, { email, password });

    saveToken(data.token);

    dispatch(setAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthInfo(adaptAuthInfoToClient(data)));
    dispatch(redirectBack());
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);

    dropToken();

    dispatch(setLogout());
  };

export const postCommentAction = (id: number, commentData: CommentPostType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<ServerComment[]>(`${APIRoute.Comments}/${id}`, commentData);

    dispatch(loadComments(data.map((comment) => adaptServerCommentToClient(comment))));
  };
