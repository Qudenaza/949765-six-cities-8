import { Offers, Offer } from '../types/types';

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const calculateRating = (rating: number): string => `${Math.round(rating) / 5 * 100}%`;

export const capitalize = (value: string): string => value[0].toUpperCase() + value.slice(1);

export const divideOffersByCity = (offers: Offer[]): Offers => {
  const dividedOffers: {
    [key: string]: Offer[],
  } = {};

  offers.forEach((offer) => {
    const key = offer.city.name;

    if (!dividedOffers[key]) {
      return dividedOffers[key] = [offer];
    }

    dividedOffers[key].push(offer);
  });

  return dividedOffers;
};
