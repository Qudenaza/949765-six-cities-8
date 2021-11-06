import { Comment } from '../../../types/types';
import { calculateRating } from '../../../utils/common';

type Props = {
  comment: Comment,
}

function ReviewComment({comment}: Props): JSX.Element {
  const date = new Date(comment.date);
  const dateOptions = { year: 'numeric' as const, month: 'long' as const };
  const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews" />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: calculateRating(comment.rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={dateTime}>{date.toLocaleString('en-US', dateOptions)}</time>
      </div>
    </li>
  );
}

export default ReviewComment;
