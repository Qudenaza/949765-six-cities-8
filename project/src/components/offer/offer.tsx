import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCommentsAction, fetchNearByOffersAction, fetchOfferAction } from '../../store/api-actions';
import Header from '../header/header';
import Review from '../review/review';
import LoadingScreen from '../loading-screen/loading-screen';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import { shuffle, upperCased } from '../../utils/common';
import { State } from '../../types/state';

const mapStateToProps = ({ offer, comments, nearByOffers, city }: State) => ({
  offer,
  comments,
  nearByOffers,
  city,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  handleOfferFetch: fetchOfferAction,
  handleCommentsFetch: fetchCommentsAction,
  handleNearByOffersFetch: fetchNearByOffersAction,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Offer({ offer, comments, nearByOffers, city, handleOfferFetch, handleCommentsFetch, handleNearByOffersFetch }: PropsFromRedux): JSX.Element {
  const [activeCardId, setActiveCardId] = useState(0);
  const params = useParams<{id: string}>();

  useEffect(() => {
    handleOfferFetch(+params.id);
    handleCommentsFetch(+params.id);
    handleNearByOffersFetch(+params.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);


  const handleOfferMouseEnter = (id: number) => {
    setActiveCardId(id);
  };

  if (!offer || offer.id !== +params.id) {
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
              {offer.isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className={offer.isFavorite ? 'property__bookmark-button property__bookmark-button--active button' : 'property__bookmark-button button'} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(offer.rating) / 5 * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{upperCased(offer.type)}</li>
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
                  <div className={offer.host.isPro ? 'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper' : 'property__avatar-wrapper user__avatar-wrapper'}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host" />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              {comments ? <Review comments={comments}/> : ''}
            </div>
          </div>
          <Map city={city} offers={nearByOffers} selectedPoint={activeCardId}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {nearByOffers ? <OfferList offers={nearByOffers} isNearby onMouseEnter={handleOfferMouseEnter}/> : ''}
          </section>
        </div>
      </main>
    </>
  );
}

export { Offer };
export default connector(Offer);
