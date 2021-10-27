export type Offer = {
  id: number,
  previewImage: string,
  isFavorite: boolean,
  isPremium: boolean,
  price: number,
  title: string,
  type: string | string[],
  rating: number,
  location: Point,
};

export type City = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Point = {
  latitude: number;
  longitude: number;
};

export type Sorting = {
  [popular: string]: (offers: Offer[]) => Offer[],
  'low': (offers: Offer[]) => Offer[],
  'high': (offers: Offer[]) => Offer[],
  'rating': (offers: Offer[]) => Offer[],
}
