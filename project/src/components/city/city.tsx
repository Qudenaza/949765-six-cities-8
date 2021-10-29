import { MouseEvent } from 'react';
import { City as CityType} from '../../types/types';

type Props = {
  activeCity: string,
  city: CityType,
  handleClick: (event: MouseEvent, city: CityType) => void,
}

function City({activeCity, city, handleClick}: Props): JSX.Element {
  const className = activeCity === city.name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item';

  return (
    <li className="locations__item">
      <a className={className} href="./" onClick={(evt) => handleClick(evt, city)}>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default City;
