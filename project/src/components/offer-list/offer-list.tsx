// import { useState } from 'react';

import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';

type Props = {
  offers: Offer[],
}

function OfferList({offers}: Props): JSX.Element {
  // const [activeOfferId, setActiveOfferId] = useState(0);

  return (
    <>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer}/>)}
    </>
  );
}

export default OfferList;
