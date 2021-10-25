import { MouseEvent } from 'react';
import City from '../city/city';
import { City as CityType } from '../../types/types';
import { cities } from '../../const';

type Props = {
  city: string,
  onCityChange: (value: CityType) => void,
}

function CityList({city, onCityChange}: Props): JSX.Element {
  const handleCityChange = (evt: MouseEvent, location: CityType) => {
    evt.preventDefault();

    onCityChange(location);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((location, index) => {
        const key = `${index}-${location.title}`;

        return <City activeCity={city} city={location} key={key} handleClick={handleCityChange}/>;
      })}
    </ul>
  );
}

export default CityList;
