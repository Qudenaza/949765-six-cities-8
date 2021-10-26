import { Sorting } from '../types/types';

export const sorting: Sorting = {
  'popular': (offers) => offers,
  'low': (offers) => offers.sort((a, b) => a.price - b.price),
  'high': (offers) => offers.sort((a, b) => b.price - a.price),
  'top rated': (offers) => offers.sort((a, b) => b.rating - a.rating),
};
