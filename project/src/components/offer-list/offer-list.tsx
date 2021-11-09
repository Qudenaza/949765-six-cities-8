import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';
import { sorting } from '../../utils/sorting';
import { getSelectedSortingType } from '../../store/app-state/selectors';

type Props = {
  offers: Offer[] | null,
  isNearby?: boolean,
  onMouseEnter?: (id: number) => void,
  onMouseLeave? : () => void,
}

function OfferList({ offers, isNearby = false, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const sortBy = useSelector(getSelectedSortingType);
  const [sortedOffers, setSortedOffers] = useState(offers);

  const handleOfferMouseEnter = (id: number) => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  useEffect(() => {
    if (sortBy && offers) {
      setSortedOffers(sorting[sortBy]([...offers]));
    }

  }, [sortBy, offers]);

  const className = isNearby ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={className} onMouseLeave={onMouseLeave}>
      {sortedOffers && sortedOffers.map((offer) => <OfferCard key={offer.id} offer={offer} isNearby={isNearby} onMouseEnter={handleOfferMouseEnter}/>)}
    </div>
  );
}

export default React.memo(OfferList, (prev, next) => prev.offers === next.offers);
