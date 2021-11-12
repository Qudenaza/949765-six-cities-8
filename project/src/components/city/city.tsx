import { MouseEvent } from 'react';
import cn from 'classnames';
import { City as CityType} from '../../types/types';
import { Link } from 'react-router-dom';

type Props = {
  isActive: boolean,
  city: CityType,
  handleClick: (event: MouseEvent, city: CityType) => void,
}

function City({isActive, city, handleClick}: Props): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        to="./"
        className={cn('locations__item-link tabs__item', {'tabs__item--active': isActive})}
        onClick={(evt) => handleClick(evt, city)}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default City;
