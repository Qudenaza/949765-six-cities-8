import { RouteProps } from 'react-router-dom';
import { AuthorizationStatus } from '../const';

export type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
}

export type AppProps = {
  rentCount: number,
};

export type AppMainProps = {
  rentCount: number,
};
