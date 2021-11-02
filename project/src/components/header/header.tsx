import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import UserBlock from '../user-block/user-block';

const mapStateToProps = ({authorizationStatus, authInfo}: State) => ({
  authorizationStatus,
  authInfo,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({authorizationStatus, authInfo}: PropsFromRedux): JSX.Element {
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

export { Header };
export default connector(Header);
