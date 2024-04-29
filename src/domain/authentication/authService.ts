import type { User, UserManagerSettings } from 'oidc-client-ts';
import { UserManager, Log, WebStorageStateStore } from 'oidc-client-ts';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import authorizationService from './authorizationService';

const origin = window.location.origin;
export const API_TOKEN = 'apiToken';

export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: process.env.REACT_APP_OIDC_AUTHORITY ?? '',
      client_id: process.env.REACT_APP_OIDC_CLIENT_ID ?? '',
      redirect_uri: `${origin}/callback`,
      // For debugging, set it to 1 minute by removing comment:
      // accessTokenExpiringNotificationTime: 59.65 * 60,
      automaticSilentRenew: false,
      silent_redirect_uri: `${origin}/silent_renew.html`,
      response_type: process.env.REACT_APP_OIDC_RETURN_TYPE ?? 'code',
      scope: process.env.REACT_APP_OIDC_SCOPE,
      post_logout_redirect_uri: `${origin}/`,
    };

    // Show oidc debugging info in the console only while developing
    if (process.env.NODE_ENV === 'development') {
      Log.setLogger(console);
      Log.setLevel(Log.INFO);
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
    this.resetAuthState = this.resetAuthState.bind(this);

    // Events
    this.userManager.events.addAccessTokenExpired(() => {
      this.logout();
    });

    this.userManager.events.addSilentRenewError(() => {
      this.logout();
    });

    this.userManager.events.addUserSignedOut(() => {
      this.resetAuthState();
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
    // TODO: getter for userKey
    const userKey = `oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`;
    const oidcStorage = localStorage.getItem(userKey);
    const apiTokens = this.getToken();

    return (
      !!oidcStorage && !!JSON.parse(oidcStorage).access_token && !!apiTokens
    );
  }

  public async login(path = '/'): Promise<void> {
    try {
      return this.userManager.signinRedirect({ url_state: path });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'Network Error') {
          Sentry.captureException(error);
        }
      }
    }
  }

  public async endLogin(): Promise<User> {
    const user = await this.userManager.signinRedirectCallback();

    await this.fetchApiToken(user);
    await authorizationService.fetchRole();

    return user;
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public resetAuthState() {
    localStorage.removeItem(API_TOKEN);
    projectService.clear();
    this.userManager.clearStaleState();
    authorizationService.clear();
  }

  public async logout(): Promise<void> {
    this.resetAuthState();
    await this.userManager.signoutRedirect();
  }

  private async fetchApiToken(user: User): Promise<void> {
    // TODO: different config for Tunnistamo and Keycloak
    const url = `${process.env.REACT_APP_OIDC_AUTHORITY}protocol/openid-connect/token`;

    // TODO: handle audiences better
    const audience = 'kukkuu-api-dev';

    const { data } = await axios(url, {
      method: 'post',
      baseURL: process.env.REACT_APP_OIDC_AUTHORITY,
      headers: {
        Authorization: `bearer ${user.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: {
        audience,
        ...(process.env.REACT_APP_OIDC_SERVER_TYPE
          ? {
              grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
              permission: '#access',
            }
          : {}),
      },
    });
    // const apiToken =
    //   apiTokens[process.env.REACT_APP_KUKKUU_API_OIDC_SCOPE as string];

    localStorage.setItem(API_TOKEN, data.access_token);
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
