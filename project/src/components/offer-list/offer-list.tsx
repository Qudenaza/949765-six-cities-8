import { useState, useEffect } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';
import { sorting } from '../../utils/sorting';

type Props = {
  offers: Offer[],
  sortBy?: string,
  isNearby?: boolean,
  onMouseEnter?: (id: number) => void,
  onMouseLeave? : () => void,
}

function OfferList({offers, sortBy, isNearby = false, onMouseEnter, onMouseLeave}: Props): JSX.Element {
  const [sortedOffers, setSortedOffers] = useState(offers);

  const handleOfferMouseEnter = (id: number) => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  useEffect(() => {
    if (sortBy) {
      setSortedOffers(sorting[sortBy]([...offers]));
    }

  }, [sortBy, offers]);

  const className = isNearby ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={className} onMouseLeave={onMouseLeave}>
      {sortedOffers.map((offer) => <OfferCard key={offer.id} offer={offer} isNearby={isNearby} onMouseEnter={handleOfferMouseEnter}/>)}
    </div>
  );
}

export default OfferList;
