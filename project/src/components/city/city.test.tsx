import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import City from './city';
import { cities } from '../../const';

describe('Component: City', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <City isActive city={cities[0]} handleClick={jest.fn()}/>
      </Router>,
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
