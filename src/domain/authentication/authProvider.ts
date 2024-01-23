import type { AuthProvider } from 'ra-core';

import authService from './authService';
import authorizationService from './authorizationService';

export type Permissions = {
  role: null | 'admin' | 'none';
  canPublishWithinProject: (projectId?: string) => boolean | null;
  canManageEventGroupsWithinProject: (projectId?: string) => boolean | null;
};

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
    const isAuthorized = authorizationService.isAuthorized();
    const isAdmin = authorizationService.getRole() === 'admin';
    const isAdminOrPermissionNotChecked =
      isAuthenticated && (!isAuthorized || isAdmin);
    const isNotAdmin = isAuthenticated && isAuthorized && !isAdmin;

    if (isAdminOrPermissionNotChecked) {
      return Promise.resolve();
    }

    if (isNotAdmin) {
      // Navigate to unauthorized-route.
      window.history.replaceState(null, '', '/unauthorized');

      // Resolve promise so the user is not logged out
      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkError: () => {
    const hasTokens = Boolean(authService.getToken());

    if (hasTokens) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: (): Promise<Permissions> => {
    const role = authorizationService.getRole();

    return Promise.resolve({
      role,
      canPublishWithinProject: authorizationService.canPublishWithinProject,
      canManageEventGroupsWithinProject:
        authorizationService.canManageEventGroupsWithinProject,
    });
  },
};

export default authProvider;
