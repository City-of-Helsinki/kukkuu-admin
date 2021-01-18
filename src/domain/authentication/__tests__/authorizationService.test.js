import dataProvider from '../../../api/dataProvider';
import profileService from '../../profile/profileService';
import authorizationService, { PERMISSIONS } from '../authorizationService';

const setPermissions = (permissions = 'admin') => {
  sessionStorage.setItem(PERMISSIONS, permissions);

  expect(sessionStorage.getItem(PERMISSIONS)).toBe(permissions);
};

describe('authorizationService', () => {
  let dataProviderSpy;
  let profileServiceSpy;

  beforeEach(() => {
    dataProviderSpy = jest
      .spyOn(dataProvider, 'getMyAdminProfile')
      .mockResolvedValue({
        data: {
          projects: {
            edges: [{ node: {} }],
          },
        },
      });
    profileServiceSpy = jest
      .spyOn(profileService, 'setDefaultProjectId')
      .mockReturnValue();
  });

  afterEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem.mockClear();
    jest.restoreAllMocks();
  });

  describe('fetchRole', () => {
    it('should call dataProvider.getMyAdminProfile', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(dataProviderSpy).toHaveBeenCalledTimes(1);
    });

    it('should save admin role into session storage when getMyAdminProfile call works and the profile has projects', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(sessionStorage.getItem(PERMISSIONS)).toEqual('admin');
    });

    it('should save none role into session storage when getMyAdminProfile returns a profile that does not have projects', async () => {
      expect.assertions(1);

      dataProviderSpy.mockResolvedValue({
        projects: {
          edges: [],
        },
      });

      await authorizationService.fetchRole();

      expect(sessionStorage.getItem(PERMISSIONS)).toEqual('none');
    });

    it('should call profileService.profileServiceSpy', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(profileServiceSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAuthorized', () => {
    it('should return true when a role is stored session storage', () => {
      setPermissions();
      expect(authorizationService.isAuthorized()).toEqual(true);
    });

    it('should return false when there is no role stored session storage', () => {
      expect(authorizationService.isAuthorized()).toEqual(false);
    });
  });

  describe('getRole', () => {
    it('should return current role in session storage', () => {
      setPermissions();
      expect(authorizationService.getRole()).toEqual('admin');
    });
  });

  describe('clear', () => {
    it('should clear permissions from session storage', () => {
      setPermissions();
      authorizationService.clear();
      expect(sessionStorage.getItem(PERMISSIONS)).toBe(null);
    });
  });
});
