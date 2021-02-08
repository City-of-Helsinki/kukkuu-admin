import { history } from '../../application/App';
import profileService from '../../profile/profileService';
import authProvider from '../authProvider';
import authService from '../authService';
import authorizationService from '../authorizationService';

const fakeToken = 'token content';

describe('authProvider', () => {
  let projectIdSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    projectIdSpy = jest.spyOn(profileService, 'projectId', 'get');
  });

  describe('login', () => {
    it('should call authService with expected params', async () => {
      const authServiceLoginSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValue();

      await authProvider.login('/messages');

      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLoginSpy).toHaveBeenLastCalledWith('/messages');
    });
  });

  describe('logout', () => {
    it('should logout using authService when user is authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = jest
        .spyOn(authService, 'isAuthenticated')
        .mockReturnValueOnce(true);
      const authServiceLogoutSpy = jest
        .spyOn(authService, 'logout')
        .mockResolvedValue();

      await authProvider.logout();

      expect(authServiceIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should not logout when user is not authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = jest
        .spyOn(authService, 'isAuthenticated')
        .mockReturnValueOnce(false);
      const authServiceLogoutSpy = jest
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
      jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
      jest
        .spyOn(authorizationService, 'isAuthorized')
        .mockReturnValueOnce(true);

      return expect(authProvider.checkAuth()).resolves.toEqual();
    });

    it('should reject when user is not authenticated according to authService', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(false);

      return expect(authProvider.checkAuth()).rejects.toEqual();
    });

    it('should redirect when the use is authenticated, authorized but not an admin', async () => {
      expect.assertions(2);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);
      jest
        .spyOn(authorizationService, 'isAuthorized')
        .mockReturnValueOnce(true);
      jest.spyOn(authorizationService, 'getRole').mockReturnValueOnce('none');
      const historySpy = jest.spyOn(history, 'replace');

      await expect(authProvider.checkAuth()).resolves.toEqual();

      expect(historySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkError', () => {
    it('should resolve when tokens are present', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getToken').mockReturnValueOnce(fakeToken);
      projectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).resolves.toEqual();
    });

    it('should reject when required tokens are missing', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getToken').mockReturnValueOnce(null);
      projectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).rejects.toEqual();
    });
  });

  describe('getPermissions', () => {
    it('should find permissions by using the authorizationService', () => {
      expect.assertions(1);
      const role = 'admin';

      jest.spyOn(authorizationService, 'getRole').mockReturnValue(role);

      return expect(authProvider.getPermissions()).resolves
        .toMatchInlineSnapshot(`
                Object {
                  "canPublishWithinProject": [Function],
                  "role": "admin",
                }
              `);
    });
  });
});
