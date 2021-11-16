function LoadingScreen(): JSX.Element {
  return (
    <div className="cssload-loader">
      <h2 className="visually-hidden">Loader</h2>
      <div className="cssload-inner cssload-one"></div>
      <div className="cssload-inner cssload-two"></div>
      <div className="cssload-inner cssload-three"></div>
    </div>
  );
}

export default LoadingScreen;
