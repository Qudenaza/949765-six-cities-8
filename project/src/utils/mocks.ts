
import { Offer, ServerOffer, Comment, ServerComment, AuthInfo, ServerAuthInfo, CommentPostType } from '../types/types';
import { address, datatype, date, image, lorem, name, internet } from 'faker';

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(1000),
  city: {
    name: address.city(),
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 10,
    },
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  previewImage: image.imageUrl(),
  maxAdults: `${datatype.number(5)}`,
  price: datatype.number(500),
  title: lorem.sentence(),
  type: 'apartment',
  rating: datatype.number(5),
  bedrooms: datatype.number(5),
  description: lorem.paragraphs(1),
  images: [],
  host: {
    id: datatype.number(1000),
    name: `${name.firstName()} ${name.lastName()}`,
    isPro: datatype.boolean(),
    avatarUrl: image.avatar(),
  },
  goods: ['wifi'],
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
  },
} as Offer);

export const makeFakeServerOffer = (): ServerOffer => ({
  id: datatype.number(1000),
  city: {
    name: address.city(),
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 10,
    },
  },
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  'preview_image': image.imageUrl(),
  'max_adults': `${datatype.number(5)}`,
  price: datatype.number(500),
  title: lorem.sentence(),
  type: 'apartment',
  rating: datatype.number(5),
  bedrooms: datatype.number(5),
  description: lorem.paragraphs(1),
  images: [],
  host: {
    id: datatype.number(1000),
    name: `${name.firstName()} ${name.lastName()}`,
    'is_pro': datatype.boolean(),
    'avatar_url': image.avatar(),
  },
  goods: ['wifi'],
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
  },
} as ServerOffer);

export const makeFakeComment = (): Comment => ({
  comment: lorem.paragraph(),
  date: date.past().toDateString(),
  id: datatype.number(1000),
  rating: datatype.number(5),
  user: {
    avatarUrl: image.avatar(),
    id: datatype.number(1000),
    isPro: datatype.boolean(),
    name: `${name.firstName()} ${name.lastName()}`,
  },
} as Comment);

export const makeFakePostComment = (): CommentPostType => ({
  comment: datatype.string(),
  rating: datatype.number(5),
} as CommentPostType);

export const makeFakeServerComment = (): ServerComment => ({
  comment: lorem.paragraph(),
  date: date.past().toDateString(),
  id: datatype.number(1000),
  rating: datatype.number(5),
  user: {
    'avatar_url': image.avatar(),
    id: datatype.number(1000),
    'is_pro': datatype.boolean(),
    name: `${name.firstName()} ${name.lastName()}`,
  },
} as ServerComment);

export const makeFakeAuthInfo = (): AuthInfo => ({
  id: datatype.number(1000),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  name: `${name.firstName()} ${name.lastName()}`,
  email: internet.email(),
  token: datatype.string(),
} as AuthInfo);

export const makeFakeServerAuthInfo = (): ServerAuthInfo => ({
  id: datatype.number(1000),
  'avatar_url': image.avatar(),
  'is_pro': datatype.boolean(),
  name: `${name.firstName()} ${name.lastName()}`,
  email: internet.email(),
  token: datatype.string(),
} as ServerAuthInfo);
