import dataProvider from '../../../api/dataProvider';
import projectService from '../../projects/projectService';
import authorizationService, { PERMISSIONS } from '../authorizationService';

const setPermissions = (permissions = 'admin') => {
  sessionStorage.setItem(PERMISSIONS, JSON.stringify({ role: permissions }));

  expect(JSON.parse(sessionStorage.getItem(PERMISSIONS)).role).toBe(
    permissions
  );
};

describe('authorizationService', () => {
  let dataProviderSpy;
  let projectServiceSpy;

  beforeEach(() => {
    dataProviderSpy = jest
      .spyOn(dataProvider, 'getMyAdminProfile')
      .mockResolvedValue({
        data: {
          projects: {
            edges: [
              {
                node: {
                  id: '123',
                  myPermissions: {
                    publish: true,
                  },
                },
              },
            ],
          },
        },
      });
    projectServiceSpy = jest
      .spyOn(projectService, 'setDefaultProjectId')
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

    // eslint-disable-next-line max-len
    it('should save admin role into session storage when getMyAdminProfile call works and the profile has projects', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(JSON.parse(sessionStorage.getItem(PERMISSIONS)).role).toEqual(
        'admin'
      );
    });

    // eslint-disable-next-line max-len
    it('should save none role into session storage when getMyAdminProfile returns a profile that does not have projects', async () => {
      expect.assertions(1);

      dataProviderSpy.mockResolvedValue({
        projects: {
          edges: [],
        },
      });

      await authorizationService.fetchRole();

      expect(JSON.parse(sessionStorage.getItem(PERMISSIONS)).role).toEqual(
        'none'
      );
    });

    it('should call projectService.projectServiceSpy', async () => {
      expect.assertions(1);

      await authorizationService.fetchRole();

      expect(projectServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should set project permissions', async () => {
      await authorizationService.fetchRole();

      expect(JSON.parse(sessionStorage.getItem(PERMISSIONS)).projects)
        .toMatchInlineSnapshot(`
        Object {
          "123": Array [
            "publish",
          ],
        }
      `);
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
