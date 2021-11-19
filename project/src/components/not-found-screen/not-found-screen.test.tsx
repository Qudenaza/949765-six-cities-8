import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-fount-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <NotFoundScreen />,
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
