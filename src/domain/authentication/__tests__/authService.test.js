import axios from 'axios';

import authService, { API_TOKEN, REFRESH_TOKEN } from '../authService';
import authorizationService from '../authorizationService';
import AppConfig from '../../application/AppConfig';
import dataProvider from '../../../api/dataProvider';

jest.mock('axios');

const testProjectId = btoa('ProjectNode:234');

const getOidcUserKey = () =>
  `oidc.user:${AppConfig.oidcAuthority}:${AppConfig.oidcClientId}`;

describe('authService', () => {
  const userManager = authService.userManager;

  beforeEach(() => {
    jest.spyOn(dataProvider, 'getMyAdminProfile').mockResolvedValue({
      data: {
        id: btoa('AdminNode:123'),
        projects: {
          edges: [
            {
              node: {
                id: testProjectId,
                year: 2023,
                name: 'test project 2023',
                myPermissions: {
                  publish: true,
                  manageEventGroups: true,
                  canSendToAllInProject: true,
                },
              },
            },
          ],
        },
      },
    });
  });

  afterEach(() => {
    localStorage.clear();
    localStorage.setItem.mockClear();
    jest.restoreAllMocks();
  });

  describe('getUser', () => {
    it('should resolve to the user value which has been resolved from getUser', async () => {
      expect.assertions(1);
      const mockUser = { name: 'Sam Littel' };

      jest.spyOn(userManager, 'getUser').mockResolvedValueOnce(mockUser);

      const user = await authService.getUser();

      expect(user).toBe(mockUser);
    });
  });

  describe('getToken', () => {
    it('should get API_TOKEN from localStorage', () => {
      const origCallCount = localStorage.getItem.mock.calls.length;
      authService.getToken();

      expect(localStorage.getItem).toHaveBeenLastCalledWith(API_TOKEN);
      expect(localStorage.getItem).toHaveBeenCalledTimes(origCallCount + 1);
    });
  });

  describe('getRefreshToken', () => {
    it('should get REFRESH_TOKEN from localStorage', () => {
      const origCallCount = localStorage.getItem.mock.calls.length;
      authService.getRefreshToken();

      expect(localStorage.getItem).toHaveBeenLastCalledWith(REFRESH_TOKEN);
      expect(localStorage.getItem).toHaveBeenCalledTimes(origCallCount + 1);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false if no token can be found', () => {
      jest.spyOn(authService, 'getToken').mockReturnValue(null);

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't exist", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      jest.spyOn(authService, 'getToken').mockReturnValue(apiTokens);
      sessionStorage.clear();

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't have an access_token property", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const invalidUser = JSON.stringify({});

      jest.spyOn(authService, 'getToken').mockReturnValue(apiTokens);
      sessionStorage.setItem(getOidcUserKey(), invalidUser);

      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true if oidc user is valid and tokens are returned from getToken', () => {
      const apiToken = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const validUser = JSON.stringify({
        name: 'Mr. Louisa Tromp',
        access_token: '5ed3abc5-9b65-4879-8d09-3cd8499650ef',
      });

      jest.spyOn(authService, 'getToken').mockReturnValue(apiToken);
      localStorage.setItem(getOidcUserKey(), validUser);

      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('login', () => {
    it('should call signinRedirect from oidc with the provided path', () => {
      const path = '/applications';
      const signinRedirect = jest.spyOn(userManager, 'signinRedirect');

      authService.login(path);

      expect(signinRedirect).toHaveBeenNthCalledWith(1, {
        url_state: path,
      });
    });
  });

  describe('endLogin', () => {
    axios.mockResolvedValue({ data: {} });
    const access_token = 'db237bc3-e197-43de-8c86-3feea4c5f886';
    const refresh_token = 'ec3510ee-11be-46d1-8b6a-ab97cb29b169';
    const mockUser = {
      name: 'Penelope Krajcik',
      access_token,
      refresh_token,
    };

    it('should call signinRedirectCallback from oidc', () => {
      const signinRedirectCallback = jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockImplementation(() => Promise.resolve(mockUser));

      authService.endLogin();

      expect(signinRedirectCallback).toHaveBeenCalledTimes(1);
    });

    it('should call fetchRoles from authorizationService', async () => {
      expect.assertions(1);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      const fetchRoleSpy = jest
        .spyOn(authorizationService, 'fetchRole')
        .mockImplementation(() => Promise.resolve());

      await authService.endLogin();

      expect(fetchRoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should return the same user object returned from signinRedirectCallback', async () => {
      expect.assertions(1);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      const user = await authService.endLogin();

      expect(user).toBe(mockUser);
    });

    it('should call fetchApiToken with the user object', async () => {
      expect.assertions(1);
      jest.spyOn(authService, 'fetchApiToken');
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockResolvedValue(mockUser);

      await authService.endLogin();

      expect(authService.fetchApiToken).toHaveBeenNthCalledWith(1, mockUser);
    });

    it('should set the tokens and project ID in localStorage before the function returns', async () => {
      expect.assertions(4);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockResolvedValue(mockUser);
      jest.spyOn(authService, 'queryApiTokensEndpoint').mockResolvedValue({
        data: {
          access_token,
          refresh_token,
        },
      });

      await authService.endLogin();

      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        1,
        API_TOKEN,
        access_token
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        2,
        REFRESH_TOKEN,
        refresh_token
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        3,
        'projectId',
        testProjectId
      );
    });
  });

  describe('renewToken', () => {
    it('should call signinSilent from oidc', async () => {
      const signinSilent = jest
        .spyOn(userManager, 'signinSilent')
        .mockResolvedValue();

      await authService.renewToken();

      expect(signinSilent).toHaveBeenCalledTimes(1);
    });

    it('should resolve to the user value which has been resolved from signinSilent', async () => {
      expect.assertions(1);
      const mockUser = { name: 'Camilla Howe' };

      jest.spyOn(userManager, 'signinSilent').mockResolvedValueOnce(mockUser);

      const user = await authService.renewToken();

      expect(user).toBe(mockUser);
    });
  });

  describe('logout', () => {
    it('should call signoutRedirect from oidc', () => {
      const signoutRedirect = jest.spyOn(userManager, 'signoutRedirect');

      authService.logout();

      expect(signoutRedirect).toHaveBeenCalledTimes(1);
    });

    it('should remove the tokens from localStorage', async () => {
      expect.assertions(2);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      const apiToken = 'a8d56df4-7ae8-4fbf-bf73-f366cd6fc479';
      const refreshToken = '347ed60c-88e4-4c08-ab25-9807be7666f4';

      localStorage.setItem(API_TOKEN, apiToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      await authService.logout();

      expect(localStorage.getItem(API_TOKEN)).toBeNull();
      expect(localStorage.getItem(REFRESH_TOKEN)).toBeNull();
    });

    it('should call clearStaleState', async () => {
      expect.assertions(1);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      jest.spyOn(userManager, 'clearStaleState').mockResolvedValue();

      await authService.logout();

      expect(userManager.clearStaleState).toHaveBeenCalledTimes(1);
    });

    it("should call authorization service's clear method", async () => {
      expect.assertions(1);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      const authorizationServiceClearSpy = jest.spyOn(
        authorizationService,
        'clear'
      );

      await authService.logout();

      expect(authorizationServiceClearSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchApiToken', () => {
    const access_token = 'db237bc3-e197-43de-8c86-3feea4c5f886';
    const mockUser = {
      name: 'Penelope Krajcik',
      access_token,
    };

    beforeEach(() => {
      axios.mockReset();

      axios.mockResolvedValue({
        data: {
          firstToken: '71ffd52c-5985-46d3-b445-490554f4012a',
          secondToken: 'de7c2a83-07f2-46bf-8417-8f648adbc7be',
        },
      });
    });

    it.only('should call axios with the right arguments', async () => {
      expect.assertions(2);
      jest
        .spyOn(AppConfig, 'oidcAudience', 'get')
        .mockReturnValue('kukkuu-api-dev');
      await authService.fetchApiToken(mockUser);

      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios.mock.calls[0]).toMatchSnapshot();
    });

    it('should call localStorage.setItem with the right arguments', async () => {
      expect.assertions(2);
      await authService.fetchApiToken(mockUser);

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem.mock.calls[0]).toMatchSnapshot();
    });
  });
});
