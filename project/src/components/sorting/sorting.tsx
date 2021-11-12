import React, { MouseEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { changeSelectedSortingType } from '../../store/action';
import SortingItem from '../sorting-item/sorting-item';
import { sortingTypes } from '../../const';
import { selectSelectedSortingType } from '../../store/app-state/selectors';

function Sorting(): JSX.Element {
  const selectedSortingType = useSelector(selectSelectedSortingType);
  const [condition, setCondition] = useState(false);

  const dispatch = useDispatch();

  const handleSortTypeChange = (evt: MouseEvent) => {
    if (evt.target instanceof HTMLLIElement) {
      dispatch(changeSelectedSortingType(evt.target.dataset.type || 'popular'));
    }

    setCondition(false);
  };

  const sortBy = sortingTypes.find((item) => item.key === selectedSortingType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setCondition(!condition)}>
        {sortBy ? sortBy.title : 'Popular'}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom', {'places__options--opened': condition, 'places__options--closed': !condition})}
        onClick={handleSortTypeChange}
      >
        {sortingTypes.map((item) => <SortingItem isSelected={selectedSortingType === item.key} dataType={item.key} key={item.title} title={item.title}/>)}
      </ul>
    </form>
  );
}


export default React.memo(Sorting);
