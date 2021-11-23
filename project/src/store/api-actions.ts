import { toast } from 'react-toastify';
import { ThunkActionResult } from '../types/action';
import { ServerOffer, ServerComment, CommentPostType } from '../types/types';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { setOffers, setNearByOffers, setFavoriteOffers, setOffer, setComments, setAuthInfo, setAuthorization, setLogout, updateOfferFavoriteStatus, setLoadingStatus } from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { adaptServerOfferToClient, adaptAuthInfoToClient, adaptServerCommentToClient } from '../adapter';
import { divideOffersByLocation } from '../utils/common';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
      const adaptedOffers = data.map((offer) => adaptServerOfferToClient(offer));

      dispatch(setOffers(divideOffersByLocation(adaptedOffers)));

      dispatch(setLoadingStatus(true));
    } catch (error) {
      dispatch(setOffers(divideOffersByLocation([])));

      dispatch(setLoadingStatus(true));

      toast.error('Не удалось загрузить данные');
    }
  };

export const fetchNearByOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${id}/nearby`);

      dispatch(setNearByOffers(data.map((offer) => adaptServerOfferToClient(offer))));
    } catch (error) {
      toast.error('Не удалось загрузить данные');
    }
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerOffer[]>(APIRoute.Favorite);
      const adaptedOffers = data.map((offer) => adaptServerOfferToClient(offer));

      dispatch(setFavoriteOffers(adaptedOffers));
    } catch (error) {
      toast.error('Не удалось загрузить  данные');
    }
  };

export const fetchOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);

      dispatch(setOffer(adaptServerOfferToClient(data)));
    } catch {
      dispatch(fetchOffersAction()).then(() => {
        const city = getState().APP.location.name;
        const offer = getState().MAIN.offers[city].find((item) => item.id === id);

        // eslint-disable-next-line
        dispatch(setOffer(offer!));
      });
    }
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerComment[]>(`${APIRoute.Comments}/${id}`);

      dispatch(setComments(data.map((comment) => adaptServerCommentToClient(comment))));
    } catch {
      toast.error('Не удалось загрузить данные.');
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get(APIRoute.Login);

      dispatch(setAuthorization(AuthorizationStatus.Auth));
      dispatch(setAuthInfo(adaptAuthInfoToClient(data)));
    } catch {
      dispatch(setAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post(APIRoute.Login, { email, password });

      saveToken(data.token);

      dispatch(setAuthorization(AuthorizationStatus.Auth));
      dispatch(setAuthInfo(adaptAuthInfoToClient(data)));
    } catch (error) {
      toast('Ошибка авторизации');
    }
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
    try {
      const { data } = await api.post(`${APIRoute.Favorite}/${id}/${status}`);

      isSingleOffer && dispatch(setOffer(adaptServerOfferToClient(data)));

      !isSingleOffer && dispatch(updateOfferFavoriteStatus(adaptServerOfferToClient(data)));
    } catch {
      toast('Не удалось выполнить действие.');
    }
  };

