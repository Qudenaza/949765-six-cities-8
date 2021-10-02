import Header from '../header/header';
import Main from '../main/main';

type Props = {
  rentCount: number,
};

function App({rentCount}: Props): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <Main rentCount={rentCount}/>
    </div>
  );
}

export default App;
