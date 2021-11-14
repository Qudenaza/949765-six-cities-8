import { Link } from 'react-router-dom';
import OfferCard from '../../offer-card/offer-card';
import { Offer } from '../../../types/types';
import { useEffect, useState } from 'react';

type Props = {
  favoriteOffers: Offer[],
};

const extractOffersCity = (offers: Offer[]): string[] => {
  const cities: {
    [key: string]: boolean,
  } = {};

  offers.forEach((offer) => {
    if (cities[offer.city.name]) {
      return;
    }

    cities[offer.city.name] = true;
  });

  return Object.keys(cities);
};

function FavoriteList({ favoriteOffers }: Props): JSX.Element {
  const [cities, setCities] = useState(['']);

  useEffect(() => {
    setCities(extractOffersCity(favoriteOffers));
  }, [favoriteOffers]);


  return (
    <>
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to="./" className="locations__item-link">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.map((offer) => offer.city.name === city && <OfferCard key={offer.id} isNearby={false} offer={offer}/>)}
          </div>
        </li>
      ))}
    </>
  );
}

export default FavoriteList;

