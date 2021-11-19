import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Location as LocationType } from '../../types/location';

type Props = {
  isActive: boolean;
  location: LocationType;
  onLocationClick: (location: LocationType) => void;
};

function Location({ isActive, location, onLocationClick }: Props): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        to="./"
        className={cn('locations__item-link tabs__item', { 'tabs__item--active': isActive })}
        onClick={() => onLocationClick(location)}
      >
        <span>{location.name}</span>
      </Link>
    </li>
  );
}

export default Location;
