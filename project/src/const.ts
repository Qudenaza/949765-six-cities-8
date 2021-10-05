export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  SignIn = '/login',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
