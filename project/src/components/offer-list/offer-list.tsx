import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';
import { sorting } from '../../utils/sorting';
import { selectSelectedSortingType } from '../../store/app-state/selectors';

type Props = {
  offers: Offer[] | null;
  isNearby?: boolean;
  setActiveCardId?: (id: number) => void;
};

function OfferList({ offers, isNearby = false, setActiveCardId }: Props): JSX.Element {
  const sortBy = useSelector(selectSelectedSortingType);
  const [sortedOffers, setSortedOffers] = useState(offers);

  const handleOfferMouseEnter = (id: number) => {
    if (setActiveCardId) {
      setActiveCardId(id);
    }
  };

  const handleOfferMouseLeave = () => {
    if (setActiveCardId) {
      setActiveCardId(Infinity);
    }
  };

  useEffect(() => {
    if (sortBy && offers) {
      setSortedOffers(sorting[sortBy]([...offers]));
    }
  }, [sortBy, offers]);

  return (
    <div
      className={cn('places__list', {
        'near-places__list': isNearby,
        'cities__places-list tabs__content': !isNearby,
      })}
      onMouseLeave={handleOfferMouseLeave}
    >
      {sortedOffers &&
        sortedOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            isNearby={isNearby}
            onMouseEnter={handleOfferMouseEnter}
          />
        ))}
    </div>
  );
}

export default React.memo(OfferList, (prev, next) => prev.offers === next.offers);
