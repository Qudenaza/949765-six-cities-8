import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';

type Props = {
  offers: Offer[],
  isNearby?: boolean,
  onMouseEnter?: (id: number) => void,
}

function OfferList({offers, isNearby, onMouseEnter}: Props): JSX.Element {

  const handleOfferMouseEnter = (id: number) => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  const className = isNearby ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={className}>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} isNearby onMouseEnter={handleOfferMouseEnter}/>)}
    </div>
  );
}

export default OfferList;
