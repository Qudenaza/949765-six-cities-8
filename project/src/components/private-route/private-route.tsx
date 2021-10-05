import { Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRouteProps } from '../../types/types';

function PrivateRoute({exact, path, authorizationStatus, component, children}: PrivateRouteProps): JSX.Element {
  return (
    <Route exact={exact} path={path} component={component}>
      { authorizationStatus === AuthorizationStatus.Auth ? children : <Redirect to={AppRoute.SignIn} /> }
    </Route>
  );
}

export default PrivateRoute;
