import React from 'react';
import { useSelector } from 'react-redux';
import UserBlock from '../user-block/user-block';
import PageLogo from '../page-logo/page-logo';
import { selectAuthorizationStatus, selectAuthInfo } from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const authInfo = useSelector(selectAuthInfo);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <PageLogo />
          </div>
          <nav className="header__nav">
            <UserBlock authorizationStatus={authorizationStatus} authInfo={authInfo} />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
