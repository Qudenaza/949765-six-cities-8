import { Offer, Comment, AuthInfo } from '../types/types';
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
  images: new Array(datatype.number(10)).fill('').map((item) => image.imageUrl()),
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
  }
} as Comment);

export const makeFakeAuthInfo = (): AuthInfo => ({
  id: datatype.number(1000),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  name: `${name.firstName()} ${name.lastName()}`,
  email: internet.email(),
  password: internet.password(),
  token: datatype.string(),
} as AuthInfo);
