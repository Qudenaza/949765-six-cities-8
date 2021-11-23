import { Link } from 'react-router-dom';
import OfferCard from '../../offer-card/offer-card';
import { Offer } from '../../../types/types';
import { divideOffersByLocation } from '../../../utils/common';

type Props = {
  favoriteOffers: Offer[];
};

function FavoriteList({ favoriteOffers }: Props): JSX.Element {
  const groupedByLocationOffers = divideOffersByLocation(favoriteOffers);

  return (
    <ul className="favorites__list">
      {Object.keys(groupedByLocationOffers).map((location) => (
        <li className="favorites__locations-items" key={location}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to="./" className="locations__item-link">
                <span>{location}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.map(
              (offer) => offer.city.name === location && <OfferCard key={offer.id} isNearby={false} offer={offer} isFavoritePage />,
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteList;
