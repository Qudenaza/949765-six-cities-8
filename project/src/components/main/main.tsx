import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity } from '../../store/action';
import Sorting from '../sorting/sorting';
import CityList from '../city-list/city-list';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import Header from '../header/header';
import { City } from '../../types/types';
import { getCity } from '../../store/app-state/selectors';
import { getOffers } from '../../store/main-data/selectors';

function Main(): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers(city.name));
  const [activeCardId, setActiveCardId] = useState(Infinity);

  const dispatch = useDispatch();

  const handleCityChange = useCallback((location: City) => {
    dispatch(changeCity(location));
  }, [city]);

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList onCityChange={handleCityChange}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers ? offers.length : 0} places to stay in {city.name}</b>
              <Sorting />
              <OfferList offers={offers} onMouseEnter={(id: number) => setActiveCardId(id)} onMouseLeave={() => setActiveCardId(Infinity)}/>
            </section>
            <div className="cities__right-section">
              <Map offers={offers} selectedPoint={activeCardId}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
