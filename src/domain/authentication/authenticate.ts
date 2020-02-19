import userManager from './userManager';

export const loginTunnistamo = () => {
  userManager.signinRedirect();
  // TODO Add error handling and Sentry
};
