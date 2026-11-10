import React from 'react';
import { IdleTimerProvider } from 'react-idle-timer';
import * as Sentry from '@sentry/browser';

import authService from './authService';
import AppConfig from '../application/AppConfig';

type IdleTimerProps = { children: React.ReactNode };

function IdleTimer({ children }: Readonly<IdleTimerProps>) {
  const onIdle = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      void authService.logout().catch((error) => {
        Sentry.captureException(error);
      });
    }
  };

  return (
    <IdleTimerProvider
      timeout={AppConfig.userIdleTimeoutInMs || 3_600_000}
      onIdle={onIdle}
      name="kukkuu-admin-idle-timer"
      startOnMount
      crossTab
    >
      {children}
    </IdleTimerProvider>
  );
}

export default IdleTimer;
