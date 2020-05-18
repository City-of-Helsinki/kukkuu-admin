import { AuthProvider } from 'ra-core';

import userManager from './userManager';
import { removeAdminProfile, getProjectId } from '../profile/utils';

const authProvider: AuthProvider = {
  login: (params) => Promise.resolve(),
  logout: (params) => {
    // TODO Add Tunnistamo logout, which requires resolving the eternal loop issue
    // where you get redirected directly to logout when returning from
    // userManager.signoutRedirect()
    localStorage.removeItem('apiToken');
    removeAdminProfile();
    console.log('logging out through authProvider -> logout');
    return userManager.removeUser();
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
