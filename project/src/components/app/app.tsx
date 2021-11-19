import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFoundScreen from '../not-found-screen/not-fount-screen';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
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
  );
}

export default App;

