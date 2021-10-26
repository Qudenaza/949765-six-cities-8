import { MouseEvent, useState } from 'react';

type Props = {
  sortBy: string,
  onSortingTypeChange: (evt: MouseEvent) => void,
}

function Sorting({sortBy, onSortingTypeChange}: Props): JSX.Element {
  const [sortingListOpened, changeSortingListCondition] = useState(false);

  const sortingTypeChangeHandler = (evt: MouseEvent) => {
    onSortingTypeChange(evt);

    changeSortingListCondition(false);
  };

  const sortingListClasses = `places__options places__options--custom ${sortingListOpened ? 'places__options--opened' : 'places__options--closed'}`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => changeSortingListCondition(!sortingListOpened)}>
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortingListClasses} onClick={sortingTypeChangeHandler}>
        <li className="places__option places__option--active" tabIndex={0} data-type="popular">Popular</li>
        <li className="places__option" tabIndex={0} data-type="low">Price: low to high</li>
        <li className="places__option" tabIndex={0} data-type="high">Price: high to low</li>
        <li className="places__option" tabIndex={0} data-type="top rated">Top rated first</li>
      </ul>
    </form>
  );
}

export default Sorting;
