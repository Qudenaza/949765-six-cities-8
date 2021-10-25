import { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity } from '../../store/action';
import CityList from '../city-list/city-list';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import Header from '../header/header';
import { State } from '../../types/state';
import { City as CityType } from '../../types/types';

const mapStateToProps = ({city, offers}: State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onCityChange: changeCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({city, offers, onCityChange}: PropsFromRedux): JSX.Element {
  const [activeCardId, setActiveCardId] = useState(+offers[0].id);

  const handleOfferMouseEnter = (id: number) => {
    setActiveCardId(id);
  };

  const handleCityChange = (location: CityType) => {
    onCityChange(location);
  };

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList city={city.title} onCityChange={handleCityChange}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.title}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offers} onMouseEnter={handleOfferMouseEnter}/>
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
