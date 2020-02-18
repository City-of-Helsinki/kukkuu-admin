import { AuthProvider } from 'ra-core';

import userManager from './userManager';

const authProvider: AuthProvider = {
  login: params => Promise.resolve(),
  logout: params => {
    // TODO Add Tunnistamo logout
    localStorage.removeItem('apiToken');
    return userManager.removeUser();
  },
  checkAuth: params => {
    if (localStorage.getItem('apiToken')) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkError: error => Promise.resolve(),
  getPermissions: params => Promise.resolve(),
};

export default authProvider;
