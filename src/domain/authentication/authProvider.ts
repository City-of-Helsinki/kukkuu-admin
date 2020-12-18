import { AuthProvider } from 'ra-core';

import { getProjectId } from '../profile/utils';
import authService from './authService';
import authorizationService from './authorizationService';

const authProvider: AuthProvider = {
  login: (next?: string) => authService.login(next),
  logout: async () => {
    const isAuthenticated = authService.isAuthenticated();

    // react-admin calls logout when there's an auth error which will
    // cause the user to be thrown into Tunnistamo. Because we do not
    // want that, we are avoiding logging out unless the user is
    // actually authenticated.
    if (isAuthenticated) {
      return authService.logout();
    }

    return Promise.resolve();
  },
  checkAuth: () => {
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkError: () => {
    const hasTokens = Boolean(authService.getToken());
    const hasProject = Boolean(getProjectId());

    if (hasTokens && hasProject) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const role = authorizationService.getRole();
    const hasAuthorization = role === 'admin';

    if (hasAuthorization) {
      return Promise.resolve(role);
    }

    return Promise.reject({ redirectTo: '/unauthorized' });
  },
};

export default authProvider;
