import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserBlock from '../user-block/user-block';
import { selectAuthorizationStatus, selectAuthInfo } from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const authInfo = useSelector(selectAuthInfo);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <UserBlock authorizationStatus={authorizationStatus} authInfo={authInfo}/>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
