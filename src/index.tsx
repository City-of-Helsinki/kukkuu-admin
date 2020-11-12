import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './assets/styles/index.css';
import App from './domain/application/App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENVIRONMENT,
    release: `${process.env.REACT_APP_APPLICATION_NAME}@${process.env.REACT_APP_VERSION}`,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
