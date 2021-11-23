import { Location } from './types/location';

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  SignIn = '/login',
  Offer = '/offer/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export const sortingTypes = [
  {
    key: 'popular',
    title: 'Popular',
  },
  {
    key: 'low',
    title: 'Price: low to high',
  },
  {
    key: 'high',
    title: 'Price: high to low',
  },
  {
    key: 'rating',
    title: 'Top rated first',
  },
];

export const locations: Location[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
];

export enum URL_MARKER {
  DEFAULT = 'img/pin.svg',
  ACTIVE = 'img/pin-active.svg',
  FALLBACK_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  FALLBACK_ACTIVE = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
}

