import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';

import { fetchApiToken } from './api';
import authProvider from './authProvider';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

// Show oidc debugging info in the console - should only be active on development
Log.logger = console;
Log.level = Log.ERROR;

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  // For debugging, set it to 1 minute by removing comment:
  // accessTokenExpiringNotificationTime: 59.65 * 60,
  automaticSilentRenew: true,
  silent_redirect_uri: `${location}/silent_renew.html`,
  response_type: 'id_token token',
  scope: process.env.REACT_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}/`,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

userManager.events.addUserSessionChanged(() => {
  console.log('zzz user session changed');
});

userManager.events.addAccessTokenExpiring(() => {
  console.log('userManager - addAccessTokenExpiring - fetching new token');
  // TODO: Find out if this is needed and smart.
  userManager
    .getUser()
    .then((user) => {
      if (user?.access_token) {
        console.log(user.access_token);
        fetchApiToken(user?.access_token)
          .then((apiToken) => {
            localStorage.setItem('apiToken', apiToken);
          })
          .catch((error) => {
            console.error('fetchApiToken in expring caught error');
            console.error(error);
          });
      }
    })
    .catch((error) => {
      console.error('Could not find user');
    });
});

userManager.events.addSilentRenewError((error) => {
  console.error('userManager addSilentRenewError', error);
});

userManager.events.addUserSignedOut(async () => {
  // TODO: Find out if this code is called under any circumstances.
  console.log('userManager -> addUserSignedOut! Calling signoutRedirect');
  await userManager.signoutRedirect();
});

userManager.events.addAccessTokenExpired(() => {
  // Redirect to the login page.
  // TODO: Decide whether this is a good idea.
  console.log('Access token expired, logging out...');
  authProvider.logout({});
});

export default userManager;
