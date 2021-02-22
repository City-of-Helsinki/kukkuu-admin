import {
  UserManager,
  User,
  UserManagerSettings,
  Log,
  WebStorageStateStore,
} from 'oidc-client';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import authorizationService from './authorizationService';

const origin = window.location.origin;
export const API_TOKEN = 'apiToken';

export class AuthService {
  private userManager: UserManager;

  constructor() {
    /* eslint-disable @typescript-eslint/camelcase */
    const settings: UserManagerSettings = {
      loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: process.env.REACT_APP_OIDC_AUTHORITY,
      client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
      redirect_uri: `${origin}/callback`,
      // For debugging, set it to 1 minute by removing comment:
      // accessTokenExpiringNotificationTime: 59.65 * 60,
      automaticSilentRenew: false,
      silent_redirect_uri: `${origin}/silent_renew.html`,
      response_type: 'id_token token',
      scope: process.env.REACT_APP_OIDC_SCOPE,
      post_logout_redirect_uri: `${origin}/`,
    };
    /* eslint-enable @typescript-eslint/camelcase */

    // Show oidc debugging info in the console only while developing
    if (process.env.NODE_ENV === 'development') {
      Log.logger = console;
      Log.level = Log.INFO;
    }

    // User Manager instance
    this.userManager = new UserManager(settings);

    // Public methods
    this.getUser = this.getUser.bind(this);
    this.getToken = this.getToken.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.endLogin = this.endLogin.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.logout = this.logout.bind(this);

    // Events
    this.userManager.events.addAccessTokenExpired(() => {
      this.logout();
    });

    this.userManager.events.addSilentRenewError(() => {
      this.logout();
    });

    this.userManager.events.addUserSignedOut(() => {
      this.userManager.clearStaleState();
      authorizationService.clear();
      localStorage.removeItem(API_TOKEN);
    });

    this.userManager.events.addUserLoaded(async (user) => {
      await this.fetchApiToken(user);
      await authorizationService.fetchRole();
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public getToken(): string | null {
    return localStorage.getItem(API_TOKEN);
  }

  public isAuthenticated() {
    const userKey = `oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`;
    const oidcStorage = localStorage.getItem(userKey);
    const apiTokens = this.getToken();

    return (
      !!oidcStorage && !!JSON.parse(oidcStorage).access_token && !!apiTokens
    );
  }

  public async login(path = '/'): Promise<void> {
    try {
      return this.userManager.signinRedirect({ data: { path } });
    } catch (error) {
      if (error.message !== 'Network Error') {
        Sentry.captureException(error);
      }
    }
  }

  public async endLogin(): Promise<User> {
    const user = await this.userManager.signinRedirectCallback();

    await this.fetchApiToken(user);
    await authorizationService.fetchRole();

    return user;
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(API_TOKEN);
    projectService.clear();
    this.userManager.clearStaleState();
    authorizationService.clear();
    await this.userManager.signoutRedirect();
  }

  private async fetchApiToken(user: User): Promise<void> {
    const url = `${process.env.REACT_APP_OIDC_AUTHORITY}/api-tokens/`;
    const { data: apiTokens } = await axios.get(url, {
      baseURL: process.env.REACT_APP_OIDC_AUTHORITY,
      headers: {
        Authorization: `bearer ${user.access_token}`,
      },
    });
    const apiToken =
      apiTokens[process.env.REACT_APP_KUKKUU_API_OIDC_SCOPE as string];

    localStorage.setItem(API_TOKEN, apiToken);
  }
}

export default new AuthService();
