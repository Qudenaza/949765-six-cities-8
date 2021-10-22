import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';

type Props = {
  offers: Offer[],
  onMouseHover: (id: number) => void,
}

function OfferList({offers, onMouseHover}: Props): JSX.Element {

  const offerCardHoverHandler = (id: number) => {
    onMouseHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onMouseHover={offerCardHoverHandler}/>)}
    </div>
  );
}

export default OfferList;
