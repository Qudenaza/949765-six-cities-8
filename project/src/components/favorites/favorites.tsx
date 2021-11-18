import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { selectFavoriteOffers } from '../../store/favorite-data/selectors';
import Header from '../header/header';
import FavoriteList from './favorite-list/favorite-list';
import Footer from '../footer/footer';

function Favorites(): JSX.Element {
  const favoriteOffers = useSelector(selectFavoriteOffers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList favoriteOffers={favoriteOffers} />
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
