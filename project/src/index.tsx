import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const RENT_COUNT = 312;

ReactDOM.render(
  <React.StrictMode>
    <App rentCount={RENT_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
