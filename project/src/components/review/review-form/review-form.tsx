import { useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import ReviewRating from '../review-rating/review-rating';
import { postCommentAction } from '../../../store/api-actions';

const ratings = [
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onFormSubmit: postCommentAction,
}, dispatch);

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewForm({onFormSubmit}: PropsFromRedux): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const params = useParams<{id: string}>();

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onFormSubmit(+params.id, {
      comment,
      rating,
    });

    setRating(0);
    setComment('');
  };

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    setRating(+evt.target.value);
  };

  const reviewChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={ratingChangeHandler}>
        {ratings.map((data) => <ReviewRating key={data.id} ratingData={data} isChecked={data.id === rating}/>)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={comment} placeholder="Tell how was your stay, what you like and what can be improved" onChange={reviewChangeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={comment.length < 50}>Submit</button>
      </div>
    </form>
  );
}

export { ReviewForm };
export default connector(ReviewForm);
