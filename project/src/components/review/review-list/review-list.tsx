import ReviewComment from '../review-comment/review-comment';

function ReviewList(): JSX.Element {
  return (
    <ul className="reviews__list">
      <ReviewComment />
    </ul>
  );
}

export default ReviewList;
