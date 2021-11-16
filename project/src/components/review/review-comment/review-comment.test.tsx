import { render, screen } from '@testing-library/react';
import ReviewComment from './review-comment';
import { makeFakeComment } from '../../../utils/mocks';

describe('Component: ReviewComment', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeComment();

    render(
      <ReviewComment comment={fakeComment}/>,
    );

    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews').getAttribute('src')).toEqual(fakeComment.user.avatarUrl);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
