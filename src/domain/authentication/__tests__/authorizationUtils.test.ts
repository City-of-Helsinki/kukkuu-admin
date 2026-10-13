import type {
  AdminProfileResponse,
  ProfileOrganisation,
  ProfileProject,
} from '../authorizationUtils';
import {
  extractProfileData,
  getProjectPermissions,
  resolveAuthorization,
} from '../authorizationUtils';

describe('authorizationUtils', () => {
  describe('extractProfileData', () => {
    it('returns empty lists and false flags when profile is null or undefined', () => {
      expect(extractProfileData(null)).toEqual({
        projects: [],
        organisations: [],
        isSystemAdmin: false,
        isEventOrganiser: false,
      });

      expect(extractProfileData(undefined)).toEqual({
        projects: [],
        organisations: [],
        isSystemAdmin: false,
        isEventOrganiser: false,
      });
    });

    it('extracts projects, organisations, and admin flags from profile', () => {
      const mockProfile: AdminProfileResponse = {
        id: 'admin-1',
        isSystemAdministrator: true,
        isEventOrganiser: false,
        projects: {
          edges: [
            {
              node: {
                id: 'project-1',
                year: 2024,
                name: 'Project 1',
                myPermissions: null,
              },
            },
          ],
        },
        organisations: {
          edges: [
            {
              node: {
                id: 'org-1',
                name: 'Org 1',
              },
            },
          ],
        },
      };

      const extracted = extractProfileData(mockProfile);

      expect(extracted.isSystemAdmin).toBe(true);
      expect(extracted.isEventOrganiser).toBe(false);
      expect(extracted.projects).toHaveLength(1);
      expect(extracted.projects[0].id).toBe('project-1');
      expect(extracted.organisations).toHaveLength(1);
      expect(extracted.organisations[0].id).toBe('org-1');
    });
  });

  describe('resolveAuthorization', () => {
    const baseProject: NonNullable<ProfileProject> = {
      id: 'project-1',
      year: 2024,
      name: 'Project 1',
      myPermissions: null,
    };

    const baseOrg: NonNullable<ProfileOrganisation> = {
      id: 'org-1',
      name: 'Org 1',
    };

    it('returns role: none with reason no_project when user has no projects', () => {
      const result = resolveAuthorization({
        projects: [],
        organisations: [baseOrg],
        isSystemAdmin: false,
        isEventOrganiser: true,
      });

      expect(result).toEqual({
        role: 'none',
        unauthorizedReason: 'no_project',
      });
    });

    it('returns role: none with reason no_organisation when user has no organisations', () => {
      const result = resolveAuthorization({
        projects: [baseProject],
        organisations: [],
        isSystemAdmin: false,
        isEventOrganiser: true,
      });

      expect(result).toEqual({
        role: 'none',
        unauthorizedReason: 'no_organisation',
      });
    });

    it('returns role: admin when user has projects, no organisations, but is a system administrator', () => {
      const result = resolveAuthorization({
        projects: [baseProject],
        organisations: [],
        isSystemAdmin: true,
        isEventOrganiser: false,
      });

      expect(result).toEqual({
        role: 'admin',
      });
    });

    it('returns role: admin when user has projects and organisations', () => {
      const result = resolveAuthorization({
        projects: [baseProject],
        organisations: [baseOrg],
        isSystemAdmin: false,
        isEventOrganiser: false,
      });

      expect(result).toEqual({
        role: 'admin',
      });
    });

    it('returns role: admin when user has projects, organisations, and is an event organiser', () => {
      const result = resolveAuthorization({
        projects: [baseProject],
        organisations: [baseOrg],
        isSystemAdmin: false,
        isEventOrganiser: true,
      });

      expect(result).toEqual({
        role: 'admin',
      });
    });
  });

  describe('getProjectPermissions', () => {
    it('extracts truthy permissions for projects, omitting __typename', () => {
      const projects: NonNullable<ProfileProject>[] = [
        {
          id: 'proj-1',
          year: 2024,
          name: 'Project 1',
          myPermissions: {
            __typename: 'ProjectPermissionsType',
            publish: true,
            manageEventGroups: false,
            canSendToAllInProject: true,
            viewFamilies: null,
          },
        },
        {
          id: 'proj-2',
          year: 2025,
          name: 'Project 2',
          myPermissions: null,
        },
      ];

      const permissions = getProjectPermissions(projects);

      expect(permissions).toEqual({
        'proj-1': ['publish', 'canSendToAllInProject'],
      });
    });
  });
});
