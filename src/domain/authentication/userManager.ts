import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';
import JwtDecode from 'jwt-decode';
import moment from 'moment-timezone';

import { fetchApiToken } from './api';

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
  automaticSilentRenew: false,
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
  console.count('addAccessTokenExpiring');
  userManager.signinSilent().then((user) => {
    userManager.storeUser(user);
    console.count('addAccessTokenExpiring - signinSilent');
    console.count(user.access_token);
    fetchApiToken(user.access_token)
      .then((apiToken) => {
        console.count('userManager addAccessTokenExpired fetchApiToken');
        const { exp } = JwtDecode(apiToken);
        const expir = moment(exp * 1000).toISOString();
        console.log(expir);
        localStorage.setItem('apiToken', apiToken);
        console.count('setting fetchingApiToken in localstorage to 0');
        localStorage.setItem('fetchingApiToken', '0');
      })
      .catch((error) => {
        console.error('addAccessTokenExpired in expiring caught error');
        console.error(error);
      });
  });
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
  console.count('addAccessTokenExpired');
  // authProvider.logout({});
});

export default userManager;
