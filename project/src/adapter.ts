import { ServerAuthInfo, AuthInfo, Offer, ServerOffer, ServerComment, Comment } from './types/types';

export const adaptServerOfferToClient = (offer: ServerOffer): Offer => ({
  bedrooms: offer.bedrooms,
  city: offer.city,
  description: offer.description,
  goods: offer.goods,
  host: {
    id: offer.host.id,
    name: offer.host.name,
    isPro: offer.host['is_pro'],
    avatarUrl: offer.host['avatar_url'],
  },
  id: offer.id,
  images: offer.images,
  isFavorite: offer['is_favorite'],
  isPremium: offer['is_premium'],
  location: offer.location,
  maxAdults: offer['max_adults'],
  previewImage: offer['preview_image'],
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  type: offer.type,
});

export const adaptAuthInfoToClient = (data: ServerAuthInfo): AuthInfo => ({
  avatarUrl: data['avatar_url'],
  email: data.email,
  id: data.id,
  isPro: data['is_pro'],
  name: data.name,
  token: data.token,
});

export const adaptServerCommentToClient = (data: ServerComment): Comment => ({
  comment: data.comment,
  date: data.date,
  id: data.id,
  rating: data.rating,
  user: {
    avatarUrl: data.user['avatar_url'],
    id: data.user.id,
    isPro: data.user['is_pro'],
    name: data.user.name,
  },
});
