import { connect, ConnectedProps } from 'react-redux';
import ReviewList from './review-list/review-list';
import ReviewForm from './review-form/review-form';
import { Comment } from '../../types/types';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

type Props = {
  comments: Comment[],
};

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & Props;

function Review({comments, authorizationStatus}: ConnectedComponentProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
    </section>
  );
}

export { Review };
export default connector(Review);
