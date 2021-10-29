import { Offer as ClientOffer, ServerOffer } from './types/types';

export const adaptOfferToClient = (offer: ServerOffer): ClientOffer => ({
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

