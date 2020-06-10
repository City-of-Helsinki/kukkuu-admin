import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';

import { fetchApiToken } from './api';
import authProvider from './authProvider';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

// Show oidc debugging info in the console - should only be active on development
Log.logger = console;
Log.level = Log.INFO;

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  loadUserInfo: true,
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
  console.count('zzz user session changed');
});

userManager.events.addAccessTokenExpiring(() => {
  console.count('userManager - addAccessTokenExpiring - fetching new token');
  if (localStorage.getItem('fetchingApiToken') !== '1') {
    const z = userManager
      .getUser()
      .then((user) => {
        if (user?.access_token) {
          console.log(user.access_token);

          localStorage.setItem('fetchingApiToken', '1');
          fetchApiToken(user?.access_token)
            .then((apiToken) => {
              console.count('userManager addAccessTokenExpiring fetchApiToken');
              localStorage.setItem('apiToken', apiToken);
              console.count('setting fetchingApiToken in localstorage to 0');
              localStorage.setItem('fetchingApiToken', '0');
            })
            .catch((error) => {
              console.error('addAccessTokenExpiring in expiring caught error');
              console.error(error);
            });
        } else {
          console.count(
            'userManager.events.addAccessTokenExpiring getUser found no user.access_token'
          );
          console.log(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.count('Not fetching API token because we are already fetching one');
  }
});

userManager.events.addSilentRenewError((error) => {
  console.error('userManager addSilentRenewError', error);
});

userManager.events.addUserSignedOut(async () => {
  // TODO: Find out if this code is called under any circumstances.
  console.count('userManager -> addUserSignedOut! Calling signoutRedirect');
  try {
    await userManager.signoutRedirect();
  } catch (error) {
    console.error(error);
  }
});

userManager.events.addAccessTokenExpired(() => {
  // TODO: Decide whether this is a good idea.
  console.count('Access token expired, (not) fetching new token...');
  console.count('Should we log the user out here?');
  authProvider.logout({});
});

export default userManager;
