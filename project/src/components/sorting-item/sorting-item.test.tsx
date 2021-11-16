import { render, screen } from '@testing-library/react';
import SortingItem from './sorting-item';

describe('Component: SortingItem', () => {
  it('should render correctly', () => {
    const sortBy = {
      key: 'low',
      title: 'Price: low to high',
    };

    render(
      <SortingItem dataType={sortBy.key} isSelected={false} title={sortBy.title}/>,
    );

    expect(screen.getByText(sortBy.title)).toBeInTheDocument();
  });
});
