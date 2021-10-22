import { useState, FormEvent, ChangeEvent } from 'react';
import ReviewRating from '../review-rating/review-rating';

type UserReview = {
  rating: number,
  review: string,
}

const RATING = [
  {
    id: 5,
    title: 'perfect',
  },
  {
    id: 4,
    title: 'good',
  },
  {
    id: 3,
    title: 'not bad',
  },
  {
    id: 2,
    title: 'badly',
  },
  {
    id: 1,
    title: 'terribly',
  },
];

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>): UserReview => {
    evt.preventDefault();

    return {
      rating,
      review,
    };
  };

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    setRating(+evt.target.value);
  };

  const reviewChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={ratingChangeHandler}>
        {RATING.map((data) => <ReviewRating key={data.id} ratingData={data}/>)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={reviewChangeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={review.length < 50}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
