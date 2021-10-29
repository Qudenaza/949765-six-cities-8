export type Offer = {
  city: City,
  id: number,
  isFavorite: boolean,
  previewImage: string,
  isPremium: boolean,
  maxAdults: string,
  price: number,
  title: string,
  type: string | string[],
  rating: number,
  location: Point,
  bedrooms: number,
  description: string,
  goods: string[],
  host: ClientHost,
  images: string[],
};

export type ServerOffer = {
  city: City,
  id: number,
  is_favorite: boolean,
  preview_image: string,
  is_premium: boolean,
  max_adults: string,
  price: number,
  title: string,
  type: string | string[],
  rating: number,
  location: Point,
  bedrooms: number,
  description: string,
  goods: string[],
  host: ServerHost,
  images: string[],
};

export type City = {
  name: string;
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  }
};

export type ClientHost = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string,
}

export type ServerHost = {
  id: number,
  name: string,
  is_pro: boolean,
  avatar_url: string,
}

export type Point = {
  latitude: number;
  longitude: number;
};

export type Sorting = {
  [key: string]: (offers: Offer[]) => Offer[],
}
