import React from 'react';
import { IdleTimerProvider } from 'react-idle-timer';

import authService from './authService';
import AppConfig from '../application/AppConfig';

type IdleTimerProps = { children: React.ReactNode };

function IdleTimer({ children }: IdleTimerProps) {
  const onIdle = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      authService.logout();
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
