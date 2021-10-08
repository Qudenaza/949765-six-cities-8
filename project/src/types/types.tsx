export type Offer = {
  id: number,
  previewImage: string,
  isFavorite: boolean,
  isPremium: boolean,
  price: number,
  title: string,
  type: string | string[],
  rating: number,
};
