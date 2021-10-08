import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type Props = RouteProps & {
  authorizationStatus: AuthorizationStatus,
}

function PrivateRoute({exact, path, authorizationStatus, component, children}: Props): JSX.Element {
  return (
    <Route exact={exact} path={path} component={component}>
      { authorizationStatus === AuthorizationStatus.Auth ? children : <Redirect to={AppRoute.SignIn} /> }
    </Route>
  );
}

export default PrivateRoute;
