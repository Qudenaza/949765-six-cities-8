import { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity } from '../../store/action';
import Sorting from '../sorting/sorting';
import CityList from '../city-list/city-list';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import Header from '../header/header';
import { State } from '../../types/state';
import { City } from '../../types/types';

const mapStateToProps = ({city, offers, selectedSortingType}: State) => ({
  city,
  offers: offers ? offers.filter((offer) => offer.city.name === city.name) : [],
  selectedSortingType,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onCityChange: changeCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({city, offers, selectedSortingType, onCityChange}: PropsFromRedux): JSX.Element {
  const [activeCardId, setActiveCardId] = useState(Infinity);

  const handleOfferMouseEnter = (id: number) => {
    setActiveCardId(id);
  };

  const handleCityChange = (location: City) => {
    onCityChange(location);
  };

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList city={city.name} onCityChange={handleCityChange}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <Sorting />
              <OfferList offers={offers} sortBy={selectedSortingType} onMouseEnter={handleOfferMouseEnter} onMouseLeave={() => setActiveCardId(Infinity)}/>
            </section>
            <div className="cities__right-section">
              <Map city={city} offers={offers} selectedPoint={activeCardId}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export { Main };
export default connector(Main);
