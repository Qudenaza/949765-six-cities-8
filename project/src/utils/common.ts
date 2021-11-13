import { GroupedByCityOffers, Offer } from '../types/types';

export const calculateRating = (rating: number): string => `${Math.round(rating) / 5 * 100}%`;

export const capitalize = (value: string): string => value[0].toUpperCase() + value.slice(1);

export const divideOffersByCity = (offers: Offer[]): GroupedByCityOffers => {
  const dividedOffers: GroupedByCityOffers = {};

  offers.forEach((offer) => {
    const key = offer.city.name;

    if (!dividedOffers[key]) {
      return dividedOffers[key] = [offer];
    }

    dividedOffers[key].push(offer);
  });

  return dividedOffers;
};
