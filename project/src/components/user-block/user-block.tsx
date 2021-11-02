import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/types';

type Props = {
  authorizationStatus: string,
  authInfo: AuthInfo,
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & Props;

function UserBlock({authorizationStatus, authInfo, onLogout}: ConnectedComponentProps): JSX.Element {
  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    onLogout();
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
        <a className="header__nav-link header__nav-link--profile" href="./">
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img src={authInfo.avatarUrl} alt="Аватар пользователя" width="20" height="20"/>
          </div>
          <span className="header__user-name user__name">{authInfo.email}</span>
        </a>
      </li>
      <li className="header__nav-item">
        <Link to="/" className="header__nav-link" onClick={handleLogout}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export { UserBlock };
export default connector(UserBlock);

