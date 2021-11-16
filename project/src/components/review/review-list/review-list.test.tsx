import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { makeFakeComment } from '../../../utils/mocks';

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const fakeComments = [makeFakeComment()];

    render(
      <ReviewList comments={fakeComments} />,
    );

    expect(screen.getByText(fakeComments[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeComments[0].comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews').getAttribute('src')).toEqual(fakeComments[0].user.avatarUrl);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
