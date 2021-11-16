import { render, screen } from '@testing-library/react';
import ReviewRating from './review-rating';

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    const ratingData = {
      id: 5,
      title: 'perfect',
    };

    render(
      <ReviewRating ratingData={ratingData} isChecked={false} isDisabled={false} />,
    );

    expect(screen.getByTitle(ratingData.title)).toBeInTheDocument();
    expect(screen.getByTitle(ratingData.title)).not.toBeChecked();
  });
});
