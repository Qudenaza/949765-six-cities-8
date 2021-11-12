import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsAction, fetchNearByOffersAction, fetchOfferAction } from '../../store/api-actions';
import cn from 'classnames';
import Header from '../header/header';
import Review from '../review/review';
import LoadingScreen from '../loading-screen/loading-screen';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import { shuffle, capitalize, calculateRating } from '../../utils/common';
import { selectOffer, selectComments, selectNearByOffers } from '../../store/offer-data/selectors';

function Offer(): JSX.Element {
  const offer = useSelector(selectOffer);
  const comments = useSelector(selectComments);
  const nearByOffers = useSelector(selectNearByOffers);
  const [activeCardId, setActiveCardId] = useState(0);
  const { id } = useParams<{id: string}>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(+id));
    dispatch(fetchCommentsAction(+id));
    dispatch(fetchNearByOffersAction(+id));

    // eslint-disable-next-line
  }, [id]);


  const handleOfferMouseEnter = (cardId: number) => {
    setActiveCardId(cardId);
  };

  if (!offer || offer.id !== +id) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {shuffle<string>(offer.images).slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className={cn('button', 'property__bookmark-button', {'property__bookmark-button--active': offer.isFavorite} )} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: calculateRating(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{capitalize(offer.type)}</li>
                <li className="property__feature property__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) => <li className="property__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={cn('property__avatar-wrapper', 'user__avatar-wrapper', {'property__avatar-wrapper--pro': offer.host.isPro})}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host" />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              {comments && <Review comments={comments}/>}
            </div>
          </div>
          <Map offers={nearByOffers} selectedPoint={activeCardId}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {nearByOffers && <OfferList offers={nearByOffers} isNearby onMouseEnter={handleOfferMouseEnter}/>}
          </section>
        </div>
      </main>
    </>
  );
}

export default Offer;
