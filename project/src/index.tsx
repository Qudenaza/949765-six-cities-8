import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';

const RENT_COUNT = 312;

ReactDOM.render(
  <React.StrictMode>
    <App rentCount={RENT_COUNT} offers={offers}/>
  </React.StrictMode>,
  document.getElementById('root'));
