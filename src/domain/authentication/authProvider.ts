import { AuthProvider } from 'ra-core';

import userManager from './userManager';
import { removeAdminProfile, getProjectId } from '../profile/utils';

const authProvider: AuthProvider = {
  login: (params) => Promise.resolve(),
  logout: async (params) => {
    localStorage.removeItem('apiToken');
    removeAdminProfile();
    console.log('logging out through authProvider -> logout');
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
    console.log('authProvider checkError', error);
    return Promise.resolve();
  },
  getPermissions: (params) => {
    console.log('authProvider getPermissions', params);
    return Promise.resolve();
  },
};

export default authProvider;
