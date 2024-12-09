import { waitFor } from '@testing-library/react';

import projectService from '../../projects/projectService';
import authProvider from '../authProvider';
import authService from '../authService';
import authorizationService from '../authorizationService';

const fakeToken = 'token content';
const navigateMock = vi.fn();
describe('authProvider', () => {
  let projectIdSpy;

  beforeEach(() => {
    vi.restoreAllMocks();
    projectIdSpy = vi.spyOn(projectService, 'projectId', 'get');
    Object.defineProperty(window, 'location', {
      value: {
        assign: navigateMock,
      },
    });
  });

  describe('login', () => {
    it('should call authService with expected params', async () => {
      const authServiceLoginSpy = vi
        .spyOn(authService, 'login')
        .mockResolvedValue();

      await authProvider.login('/messages');

      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLoginSpy).toHaveBeenLastCalledWith('/messages');
    });
  });

  describe('logout', () => {
    it('should logout using authService when user is authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = vi
        .spyOn(authService, 'isAuthenticated')
        .mockReturnValueOnce(true);
      const authServiceLogoutSpy = vi
        .spyOn(authService, 'logout')
        .mockResolvedValue();

      await authProvider.logout();

      expect(authServiceIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should not logout when user is not authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = vi
        .spyOn(authService, 'isAuthenticated')
        .mockReturnValueOnce(false);
      const authServiceLogoutSpy = vi
        .spyOn(authService, 'logout')
        .mockResolvedValue();

      await authProvider.logout();

      expect(authServiceIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('checkAuth', () => {
    it('should resolve when user is authenticated and authorized', () => {
      expect.assertions(1);
      vi.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
      vi.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(true);

      return expect(authProvider.checkAuth()).resolves.toEqual();
    });

    it('should reject when user is not authenticated according to authService', () => {
      expect.assertions(1);
      vi.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(false);

      return expect(authProvider.checkAuth()).rejects.toEqual();
    });

    it('should redirect when the user is authenticated, authorized but not an admin', async () => {
      // expect.assertions(2);
      vi.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
      vi.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(true);
      vi.spyOn(authorizationService, 'getRole').mockReturnValueOnce('none');
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { assign: vi.fn() },
      });
      await expect(authProvider.checkAuth()).resolves.toEqual();
      await waitFor(() => {
        expect(window.location.href).toEqual('/unauthorized');
      });
    });
  });

  describe('checkError', () => {
    it('should resolve when tokens are present', () => {
      expect.assertions(1);
      vi.spyOn(authService, 'getToken').mockReturnValueOnce(fakeToken);
      projectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).resolves.toEqual();
    });

    it('should reject when required tokens are missing', () => {
      expect.assertions(1);
      vi.spyOn(authService, 'getToken').mockReturnValueOnce(null);
      projectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).rejects.toEqual();
    });
  });

  describe('getPermissions', () => {
    it('should find permissions by using the authorizationService', () => {
      expect.assertions(1);
      const role = 'admin';

      vi.spyOn(authorizationService, 'getRole').mockReturnValue(role);

      return expect(authProvider.getPermissions()).resolves
        .toMatchInlineSnapshot(`
        {
          "canManageEventGroupsWithinProject": [Function],
          "canPublishWithinProject": [Function],
          "canSendMessagesToAllRecipientsWithinProject": [Function],
          "role": "admin",
        }
      `);
    });
  });
});
