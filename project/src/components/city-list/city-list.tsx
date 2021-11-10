import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import City from '../city/city';
import { City as CityType } from '../../types/types';
import { cities } from '../../const';
import { selectCity } from '../../store/app-state/selectors';

type Props = {
  onCityChange: (value: CityType) => void,
}

function CityList({onCityChange}: Props): JSX.Element {
  const city = useSelector(selectCity);

  const handleCityChange = (evt: MouseEvent, location: CityType) => {
    evt.preventDefault();

    onCityChange(location);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((location) => <City activeCity={city.name} city={location} key={location.name} handleClick={handleCityChange}/>)}
    </ul>
  );
}

export default React.memo(CityList);
