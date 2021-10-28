type Props  = {
  dataType: string,
  selectedSortingType: string,
  title: string,
}

function SortingItem({dataType, selectedSortingType, title}: Props): JSX.Element {
  const className = `places__option ${selectedSortingType === dataType ? 'places__option--active' : ''}`;

  return (
    <li className={className} tabIndex={0} data-type={dataType}>{title}</li>
  );
}

export default SortingItem;
