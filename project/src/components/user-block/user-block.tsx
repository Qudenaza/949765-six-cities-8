import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/types';

type Props = {
  authorizationStatus: string,
  authInfo: AuthInfo | null,
};

function UserBlock({authorizationStatus, authInfo}: Props): JSX.Element {
  const dispatch = useDispatch();

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to="/login" className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to="/favorites" className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img src={authInfo ? authInfo.avatarUrl : '#'} alt="Аватар пользователя" width="20" height="20"/>
          </div>
          <span className="header__user-name user__name">{authInfo && authInfo.email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link to="/" className="header__nav-link" onClick={handleLogout}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;

