import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';

function PageLogo(): JSX.Element {
  const history = useHistory();
  const isRoot = history.location.pathname === '/';

  return (
    <Link to="/" className={cn('header__logo-link', { 'header__logo-link--active': isRoot })}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default PageLogo;
