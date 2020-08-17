import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';
import * as Sentry from '@sentry/browser';

import { fetchApiToken } from './api';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

// Show oidc debugging info in the console only while developing
if (process.env.NODE_ENV === 'development') {
  Log.logger = console;
  Log.level = Log.INFO;
}

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  // For debugging, set it to 1 minute by removing comment:
  // accessTokenExpiringNotificationTime: 59.65 * 60,
  automaticSilentRenew: false,
  silent_redirect_uri: `${location}/silent_renew.html`,
  response_type: 'id_token token',
  scope: process.env.REACT_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}/`,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

userManager.events.addAccessTokenExpiring(async () => {
  try {
    const newUser = await userManager.signinSilent();
    await userManager.storeUser(newUser);
    // Remove API token to force logout if renewal fails (see authProvider.ts)
    localStorage.removeItem('apiToken');
    const apiToken = await fetchApiToken(newUser.access_token);
    localStorage.setItem('apiToken', apiToken);
  } catch (error) {
    // This happens if you're offline for example, and it is responsible to log out.
    localStorage.removeItem('apiToken');
    // TODO: Decide if we want these errors to go to Sentry
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

userManager.events.addSilentRenewError((error) => {
  // eslint-disable-next-line no-console
  console.error('userManager addSilentRenewError', error);
});

userManager.events.addAccessTokenExpired(async () => {
  // This is probably torta på torta because the apiToken will be removed in
  // addAccessTokenExpiring
  try {
    localStorage.removeItem('apiToken');
  } catch (error) {
    // TODO: Decide if we want these errors to go to Sentry
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

export default userManager;
