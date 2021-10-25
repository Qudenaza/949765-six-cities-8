import { City } from './types/types';

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  SignIn = '/login',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const cities: City[] = [
  {
    title: 'Paris',
    lat: 48.864716,
    lng: 2.349014,
    zoom: 10,
  },
  {
    title: 'Cologne',
    lat: 50.935173,
    lng: 6.953101,
    zoom: 10,
  },
  {
    title: 'Brussels',
    lat: 50.850346,
    lng: 4.351721,
    zoom: 10,
  },
  {
    title: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    zoom: 10,
  },
  {
    title: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682,
    zoom: 10,
  },
  {
    title: 'Dusseldorf',
    lat: 51.227741,
    lng: 6.773456,
    zoom: 10,
  },
];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
