import * as profileUtils from '../../profile/utils';
import authProvider from '../authProvider';
import authService from '../authService';
import authorizationService from '../authorizationService';

const fakeToken = 'token content';

describe('authProvider', () => {
  let getProjectIdSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    getProjectIdSpy = jest.spyOn(profileUtils, 'getProjectId');
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
    it('should resolve when user is authenticated according to authService and the user has a project id', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(true);

      return expect(authProvider.checkAuth()).resolves.toEqual();
    });

    it('should reject when user is not authenticated according to authService', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValueOnce(false);

      return expect(authProvider.checkAuth()).rejects.toEqual();
    });
  });

  describe('checkError', () => {
    it('should resolve when tokens are present', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getToken').mockReturnValueOnce(fakeToken);
      getProjectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).resolves.toEqual();
    });

    it('should reject when required tokens are missing', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getToken').mockReturnValueOnce(null);
      getProjectIdSpy.mockReturnValueOnce('123');

      return expect(authProvider.checkError()).rejects.toEqual();
    });

    it('should reject when user does not have project id', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getToken').mockReturnValueOnce(fakeToken);
      getProjectIdSpy.mockReturnValueOnce();

      return expect(authProvider.checkAuth()).rejects.toEqual();
    });
  });

  describe('getPermissions', () => {
    it('should find permissions by using the authorizationService', () => {
      expect.assertions(1);
      const role = 'admin';

      jest.spyOn(authorizationService, 'getRole').mockReturnValue(role);

      return expect(authProvider.getPermissions()).resolves.toEqual(role);
    });

    it('should reject when permission is none', () => {
      expect.assertions(1);
      const role = 'none';

      jest.spyOn(authorizationService, 'getRole').mockReturnValue(role);

      return expect(authProvider.getPermissions()).rejects.toEqual({
        redirectTo: '/unauthorized',
      });
    });
  });
});
