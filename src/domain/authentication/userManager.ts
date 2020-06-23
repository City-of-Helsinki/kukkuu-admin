import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';
import * as Sentry from '@sentry/browser';

import { fetchApiToken } from './api';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

if (process.env.NODE_ENV === 'development') {
  // Show oidc debugging info in the console - should only be active on development
  Log.logger = console;
  Log.level = Log.DEBUG;
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
    console.count('userManager addAccessTokenExpiring fetchApiToken');

    try {
      const newUser = await userManager.signinSilent();
      console.count('1 userManager addAccessTokenExpiring newUser');
      await userManager.storeUser(newUser);
      console.count('2 userManager addAccessTokenExpiring storeUser');
      localStorage.removeItem('apiToken');
      try {
        const apiToken = await fetchApiToken(newUser.access_token);
        localStorage.setItem('apiToken', apiToken);
        console.count('3 userManager addAccessTokenExpiring fetchApiToken');
      } catch (error) {
        console.log('userManager addAccessTokenExpiring fetchApiToken error');
        console.error(error);
      }
    } catch (error) {
      console.log('addAccessTokenExpiring - signinSilent error');
      console.error(error);
    }
  } catch (error) {
    // This happens if you're offline for example, seems responsible to log out.
    console.error(
      'XXXX addAccessTokenExpiring caught error somewhere in addAccessTokenExpiring XXXX'
    );
    localStorage.removeItem('apiToken');
    //await userManager.signoutRedirect();
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

userManager.events.addSilentRenewError((error) => {
  // eslint-disable-next-line no-console
  console.error('userManager addSilentRenewError', error);
});

userManager.events.addUserSignedOut(async () => {
  // TODO: Find out if this code is called under any circumstances.
  console.count('userManager -> addUserSignedOut! Calling signoutRedirect');
  try {
    // await userManager.signoutRedirect();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    Sentry.captureException(error);
  }
});

userManager.events.addAccessTokenExpired(async () => {
  console.count('addAccessTokenExpired');
  try {
    localStorage.removeItem('apiToken');
    // await userManager.signoutRedirect();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    Sentry.captureException(error);
  }
});

export default userManager;
