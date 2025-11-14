import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';

import './assets/styles/index.css';
import packageJson from '../package.json';
import App from './domain/application/App';
import * as serviceWorker from './serviceWorker';

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
    release: import.meta.env.VITE_SENTRY_RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: parseFloat(
      import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    tracePropagationTargets: (
      import.meta.env.VITE_SENTRY_TRACE_PROPAGATION_TARGETS || ''
    ).split(','),
    replaysSessionSampleRate: parseFloat(
      import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '0'
    ),
    replaysOnErrorSampleRate: parseFloat(
      import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '0'
    ),
  });
}

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
