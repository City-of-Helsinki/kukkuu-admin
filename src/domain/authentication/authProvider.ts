/* eslint-disable @typescript-eslint/unbound-method */
import type { AuthProvider } from 'ra-core';

import authService from './authService';
import authorizationService from './authorizationService';

export type HasProjectPermission = (projectId?: string) => boolean | null;

export type Permissions = {
  role: null | 'admin' | 'none';
  canPublishWithinProject: HasProjectPermission;
  canManageEventGroupsWithinProject: HasProjectPermission;
  canSendMessagesToAllRecipientsWithinProject: HasProjectPermission;
  canViewFamiliesWithinProject: HasProjectPermission;
};

const authProvider: AuthProvider = {
  login: async (next?: string) => {
    await authService.login(next);
  },
  logout: async () => {
    const isAuthenticated = authService.isAuthenticated();

    // react-admin calls logout when there's an auth error which will
    // cause the user to be thrown into Tunnistamo. Because we do not
    // want that, we are avoiding logging out unless the user is
    // actually authenticated.
    if (isAuthenticated) {
      await authService.logout();
      return;
    }

    await Promise.resolve();
  },
  checkAuth: async () => {
    const isAuthenticated = authService.isAuthenticated();
    const isAuthorized = authorizationService.isAuthorized();
    const isAdmin = authorizationService.getRole() === 'admin';
    const isAdminOrPermissionNotChecked =
      isAuthenticated && (!isAuthorized || isAdmin);
    const isNotAdmin = isAuthenticated && isAuthorized && !isAdmin;

    if (isAdminOrPermissionNotChecked) {
      await Promise.resolve();
      return;
    }

    if (isNotAdmin) {
      // Navigate to unauthorized-route.
      window.location.href = '/unauthorized';
      // Resolve promise so the user is not logged out
      await Promise.resolve();
      return;
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    await Promise.reject();
  },
  checkError: async () => {
    const hasTokens = Boolean(authService.getToken());

    if (hasTokens) {
      await Promise.resolve();
      return;
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    await Promise.reject();
  },
  getPermissions: async (): Promise<Permissions> => {
    const role = authorizationService.getRole();

    return await Promise.resolve({
      role,

      canPublishWithinProject: authorizationService.canPublishWithinProject,
      canManageEventGroupsWithinProject:
        authorizationService.canManageEventGroupsWithinProject,
      canSendMessagesToAllRecipientsWithinProject:
        authorizationService.canSendMessagesToAllRecipientsWithinProject,
      canViewFamiliesWithinProject:
        authorizationService.canViewFamiliesWithinProject,
    });
  },
};

export default authProvider;
