import { Sorting as SortingType } from '../types/types';

export const sorting: SortingType = {
  'popular': (offers) => offers,
  'low': (offers) => offers.sort((a, b) => a.price - b.price),
  'high': (offers) => offers.sort((a, b) => b.price - a.price),
  'rating': (offers) => offers.sort((a, b) => b.rating - a.rating),
};
