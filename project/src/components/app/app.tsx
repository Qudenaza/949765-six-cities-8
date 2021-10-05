import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import NotFoundScreen from '../not-found-screen/not-fount-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AppProps } from '../../types/types';

function App({rentCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <Main rentCount={rentCount}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute path={AppRoute.Favorites} authorizationStatus={AuthorizationStatus.NoAuth} exact>
          <Favorites />
        </PrivateRoute>
        <Route path={AppRoute.Offer} exact>
          <Room />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
