import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

type Props = RouteProps & {
  authorizationStatus: AuthorizationStatus,
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & Props;

function PrivateRoute({exact, path, authorizationStatus, component, children}: ConnectedComponentProps): JSX.Element {
  return (
    <Route exact={exact} path={path} component={component}>
      { authorizationStatus === AuthorizationStatus.Auth ? children : <Redirect to={AppRoute.SignIn} /> }
    </Route>
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
