import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';

type Props = {
  offers: Offer[],
  onMouseEnter: (id: number) => void,
}

function OfferList({offers, onMouseEnter}: Props): JSX.Element {

  const handleOfferMouseEnter = (id: number) => {
    onMouseEnter(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onMouseEnter={handleOfferMouseEnter}/>)}
    </div>
  );
}

export default OfferList;
