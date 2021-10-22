
type Props = {
  ratingData: {
    id: number,
    title: string,
  }
}

function ReviewRating({ratingData: { id, title} }: Props): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={id} id={`${id}-stars`} type="radio" />
      <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewRating;
