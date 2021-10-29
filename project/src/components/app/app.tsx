import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFoundScreen from '../not-found-screen/not-fount-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({ isDataLoaded }: State) => ({
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({isDataLoaded}: PropsFromRedux): JSX.Element {
  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <Main />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute path={AppRoute.Favorites} authorizationStatus={AuthorizationStatus.NoAuth} exact>
          <Favorites offers={[]}/>
        </PrivateRoute>
        <Route path={AppRoute.Offer} exact>
          <Offer />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
