export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
};

export type ServerAuthInfo = {
  'avatar_url': string,
  email: string,
  id: number,
  'is_pro': boolean,
  name: string,
  token: string,
};

export type Offer = {
  city: City,
  id: number,
  isFavorite: boolean,
  previewImage: string,
  isPremium: boolean,
  maxAdults: string,
  price: number,
  title: string,
  type: string,
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
  'is_favorite': boolean,
  'preview_image': string,
  'is_premium': boolean,
  'max_adults': string,
  price: number,
  title: string,
  type: string,
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
  'is_pro': boolean,
  'avatar_url': string,
}

export type Point = {
  latitude: number;
  longitude: number;
};

export type Sorting = {
  [key: string]: (offers: Offer[]) => Offer[],
}

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  },
};

export type CommentPostType = {
  comment: string,
  rating: number,
};

export type ServerComment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    'avatar_url': string,
    id: number,
    'is_pro': boolean,
    name: string
  },
}
