import { AuthProvider } from 'ra-core';

import userManager from './userManager';
import { removeAdminProfile, getProjectId } from '../profile/utils';

const authProvider: AuthProvider = {
  login: (params) => Promise.resolve(),
  logout: async (params) => {
    localStorage.removeItem('apiToken');
    removeAdminProfile();
    if (Boolean(await userManager.getUser())) {
      return '/logout';
    }
  },
  checkAuth: (params) => {
    if (!localStorage.getItem('apiToken')) {
      return Promise.reject();
    }
    if (!getProjectId()) {
      return Promise.reject({ redirectTo: '/unauthorized' });
    }
    return Promise.resolve();
  },
  checkError: (error) => {
    // Trigger a logout if the apiToken is not in place
    return localStorage.getItem('apiToken')
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: (params) => {
    return Promise.resolve();
  },
};

export default authProvider;
