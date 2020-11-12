import dataProvider from '../../../api/dataProvider';
import * as profileUtils from '../../profile/utils';
import authorizationService, { PERMISSIONS } from '../authorizationService';

const setPermissions = (permissions = 'admin') => {
  sessionStorage.setItem(PERMISSIONS, permissions);

  expect(sessionStorage.getItem(PERMISSIONS)).toBe(permissions);
};

describe('authorizationService', () => {
  let dataProviderSpy;
  let setAdminProfileSpy;

  beforeEach(() => {
    dataProviderSpy = jest
      .spyOn(dataProvider, 'getMyAdminProfile')
      .mockResolvedValue({
        data: {},
      });
    setAdminProfileSpy = jest
      .spyOn(profileUtils, 'setAdminProfile')
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

    it('should save admin role into session storage when getMyAdminProfile call works', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(sessionStorage.getItem(PERMISSIONS)).toEqual('admin');
    });

    it('should save none role into session storage when getMyAdminProfile call fails', async () => {
      expect.assertions(1);

      dataProviderSpy.mockRejectedValue({});

      await authorizationService.fetchRole();

      expect(sessionStorage.getItem(PERMISSIONS)).toEqual('none');
    });

    it('should call setAdminProfile', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(setAdminProfileSpy).toHaveBeenCalledTimes(1);
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
