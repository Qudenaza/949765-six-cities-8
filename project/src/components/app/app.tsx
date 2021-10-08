import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFoundScreen from '../not-found-screen/not-fount-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer as OfferType } from '../../types/types';

type Props = {
  rentCount: number,
  offers: OfferType[],
}

function App({rentCount, offers}: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <Main rentCount={rentCount} offers={offers}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute path={AppRoute.Favorites} authorizationStatus={AuthorizationStatus.NoAuth} exact>
          <Favorites offers={offers}/>
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

export default App;
