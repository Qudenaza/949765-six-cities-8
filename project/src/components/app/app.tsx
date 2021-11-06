import { useSelector } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFoundScreen from '../not-found-screen/not-fount-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';
import { getLoadedDataStatus } from '../../store/main-data/selectors';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getLoadedDataStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <Main />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute path={AppRoute.Favorites} exact>
          <Favorites />
        </PrivateRoute>
        <Route path={AppRoute.Offer} exact>
          <Offer />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

