import cn from 'classnames';

type Props  = {
  dataType: string,
  isSelected: boolean,
  title: string,
}

function SortingItem({dataType, isSelected, title}: Props): JSX.Element {
  return (
    <li
      className={cn('places__option', {'places__option--active': isSelected})}
      tabIndex={0}
      data-type={dataType}
    >{title}
    </li>
  );
}

export default SortingItem;
