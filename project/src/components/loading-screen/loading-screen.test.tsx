import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LaodingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);

    expect(screen.getByText('Loader')).toHaveClass('visually-hidden');
  });
});
