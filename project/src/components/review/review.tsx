import { useSelector } from 'react-redux';
import ReviewList from './review-list/review-list';
import ReviewForm from './review-form/review-form';
import { Comment } from '../../types/types';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type Props = {
  comments: Comment[],
};

function Review({ comments }: Props): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default Review;
