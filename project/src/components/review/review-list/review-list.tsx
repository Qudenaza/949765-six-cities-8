import ReviewComment from '../review-comment/review-comment';
import { Comment } from '../../../types/types';

type Props = {
  comments: Comment[],
};

function ReviewList({comments}: Props): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewComment key={comment.id} comment={comment}/>)}
    </ul>
  );
}

export default ReviewList;
