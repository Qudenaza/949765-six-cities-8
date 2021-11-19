import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { fetchOffersAction, fetchNearByOffersAction, fetchFavoriteOffersAction, fetchOfferAction, fetchCommentsAction, checkAuthAction, loginAction, logoutAction, postCommentAction, postFavoriteStatusAction } from './api-actions';
import { State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { setOffers, setNearByOffers, setFavoriteOffers, setOffer, setComments, setAuthInfo, setAuthorization, setLogout, updateOfferFavoriteStatus } from './action';
import { AuthData } from '../types/auth-data';
import { makeFakeServerAuthInfo, makeFakeServerOffer, makeFakeServerComment, makeFakePostComment } from '../utils/mocks';
import { adaptAuthInfoToClient, adaptServerOfferToClient, adaptServerCommentToClient } from '../adapter';
import { divideOffersByLocation } from '../utils/common';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch SetOffers when GET /hotels', async () => {
    const store = mockStore();
    const fakeOffersFromServer = [makeFakeServerOffer()];
    const fakeAdaptedOffers = fakeOffersFromServer.map((offer) => adaptServerOfferToClient(offer));

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffersFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([setOffers(divideOffersByLocation(fakeAdaptedOffers))]);
  });
  it('should dispatch SetNearByOffers when GET /hotels/:id/nearby', async () => {
    const store = mockStore();
    const fakeOffersFromServer = [makeFakeServerOffer()];
    const fakeAdaptedOffers = fakeOffersFromServer.map((offer) => adaptServerOfferToClient(offer));

    mockAPI
      .onGet(`${APIRoute.Offers}/${0}/nearby`)
      .reply(200, fakeOffersFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearByOffersAction(0));

    expect(store.getActions()).toEqual([setNearByOffers(fakeAdaptedOffers)]);
  });
  it('should dispatch SetFavoriteOffers when GET /favorite', async () => {
    const store = mockStore();
    const fakeOffersFromServer = [makeFakeServerOffer()];
    const fakeAdaptedOffers = fakeOffersFromServer.map((offer) => adaptServerOfferToClient(offer));

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeOffersFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions()).toEqual([setFavoriteOffers(fakeAdaptedOffers)]);
  });
  it('should dispatch SetOffer when GET /offer/:id', async () => {
    const store = mockStore();
    const fakeOfferFromServer = makeFakeServerOffer();
    const fakeAdaptedOffer = adaptServerOfferToClient(fakeOfferFromServer);

    mockAPI
      .onGet(`${APIRoute.Offers}/0`)
      .reply(200, fakeOfferFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferAction(0));

    expect(store.getActions()).toEqual([setOffer(fakeAdaptedOffer)]);
  });
  it('should dispatch SetComments when GET /comments/:hotel_id', async () => {
    const store = mockStore();
    const fakeCommentsFromServer = [makeFakeServerComment(), makeFakeServerComment()];
    const fakeAdaptedComments = fakeCommentsFromServer.map((comment) => adaptServerCommentToClient(comment));

    mockAPI
      .onGet(`${APIRoute.Comments}/0`)
      .reply(200, fakeCommentsFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCommentsAction(0));

    expect(store.getActions()).toEqual([setComments(fakeAdaptedComments)]);
  });
  it('should dispatch SetAuthorization and SetAuthInfo when GET /login', async () => {
    const store = mockStore();
    const fakeServerAuthInfo = makeFakeServerAuthInfo();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeServerAuthInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      setAuthorization(AuthorizationStatus.Auth),
      setAuthInfo(adaptAuthInfoToClient(fakeServerAuthInfo)),
    ]);
  });
  it('should dispatch SetAuthorization and SetAuthInfo when POST /login', async () => {
    const store = mockStore();
    const fakeUser: AuthData = {
      email: 'test@test.ru',
      password: '123456',
    };
    const fakeAuthInfoFromServer = makeFakeServerAuthInfo();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeAuthInfoFromServer);

    expect(store.getActions()).toEqual([]);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      setAuthorization(AuthorizationStatus.Auth),
      setAuthInfo(adaptAuthInfoToClient(fakeAuthInfoFromServer)),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-sities-token', fakeAuthInfoFromServer.token);
  });
  it('should dispatch SetLogut when DELETE /logout', async () => {
    const store = mockStore();

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([setLogout(AuthorizationStatus.NoAuth)]);
  });
  it('should dispatch SetComments when POST /comment/:hotel_id', async () => {
    const store = mockStore();
    const fakeComment = makeFakePostComment();
    const fakeAdaptedComment = { ...makeFakeServerComment(), comment: fakeComment.comment, rating: fakeComment.rating };
    const fakeCommentsFromServer = [makeFakeServerComment(), fakeAdaptedComment];
    const fakeAdaptedComments = fakeCommentsFromServer.map((comment) => adaptServerCommentToClient(comment));

    mockAPI
      .onPost(`${APIRoute.Comments}/0`, fakeComment)
      .reply(200, fakeCommentsFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postCommentAction(0, fakeComment));

    expect(store.getActions()).toEqual([setComments(fakeAdaptedComments)]);
  });
  it('should dispatch UpdateOfferFavoriteStatus when POST /favorite/:hotel_id/:status', async () => {
    const store = mockStore();
    const fakeServerOffer = { ...makeFakeServerOffer(), id: 0, 'is_favorite': true };
    const adaptedOffer = adaptServerOfferToClient(fakeServerOffer);

    mockAPI
      .onPost(`${APIRoute.Favorite}/0/1`)
      .reply(200, fakeServerOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postFavoriteStatusAction(0, 1, false));

    expect(store.getActions()).toEqual([updateOfferFavoriteStatus(adaptedOffer)]);
  });
});
