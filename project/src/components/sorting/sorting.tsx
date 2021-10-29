import { MouseEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { changeSelectedSortingType } from '../../store/action';
import SortingItem from '../sorting-item/sorting-item';
import { sortingTypes } from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({ selectedSortingType }: State) => ({
  selectedSortingType,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onSelectedSortingTypeChange: changeSelectedSortingType,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

function Sorting({ selectedSortingType, onSelectedSortingTypeChange }: ConnectedProps<typeof connector>): JSX.Element {
  const [condition, setCondition] = useState(false);

  const handleSortTypeChange = (evt: MouseEvent) => {
    if (evt.target instanceof HTMLLIElement) {
      onSelectedSortingTypeChange(evt.target.dataset.type || 'popular');
    }

    setCondition(false);
  };

  const sortingListClasses = `places__options places__options--custom ${condition ? 'places__options--opened' : 'places__options--closed'}`;

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
      <ul className={sortingListClasses} onClick={handleSortTypeChange}>
        {sortingTypes.map((item) => <SortingItem selectedSortingType={selectedSortingType} dataType={item.key} key={item.title} title={item.title}/>)}
      </ul>
    </form>
  );
}


export { Sorting };
export default connector(Sorting);
