import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Location from '../location/location';
import { Location as LocationType } from '../../types/location';
import { locations } from '../../const';
import { selectLocation } from '../../store/app-state/selectors';
import { changeLocation } from '../../store/action';

function LocationList(): JSX.Element {
  const { name } = useSelector(selectLocation);

  const dispatch = useDispatch();

  const handleLocationClick = (location: LocationType): void => {
    dispatch(changeLocation(location));
  };

  return (
    <ul className="locations__list tabs__list">
      {locations.map(
        (item): JSX.Element => (
          <Location
            isActive={name === item.name}
            location={item}
            key={item.name}
            onLocationClick={handleLocationClick}
          />
        ),
      )}
    </ul>
  );
}

export default React.memo(LocationList);
