import * as Sentry from '@sentry/browser';

import userManager from './userManager';

export const loginTunnistamo = () => {
  userManager.signinRedirect().catch((error) => {
    Sentry.captureException(error);
    console.error(error);
  });
};
