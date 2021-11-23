import { useSelector } from 'react-redux';
import ReviewList from './review-list/review-list';
import ReviewForm from './review-form/review-form';
import { Comment } from '../../types/types';
import { AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

type Props = {
  comments: Comment[];
};

function Review({ comments }: Props): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const sortedComments = comments.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayedComments = sortedComments.length >= 10 ? sortedComments.slice(0, 10) : sortedComments;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{displayedComments.length}</span>
      </h2>
      <ReviewList comments={displayedComments} />
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default Review;
