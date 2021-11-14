import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

function PrivateRoute({exact, path, component, children}: RouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return (
    <Route exact={exact} path={path} component={component}>
      { authorizationStatus === AuthorizationStatus.Auth ? children : <Redirect to={AppRoute.SignIn} /> }
    </Route>
  );
}

export default PrivateRoute;
