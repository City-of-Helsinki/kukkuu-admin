import RelayList from '../../api/relayList';
import type {
  MyAdminProfileQuery,
  ProjectPermissionsType,
} from '../api/generatedTypes/graphql';

/**
 * Access role in the admin dashboard.
 */
export type Role = 'admin' | 'none';

/**
 * Reason explaining why the user is not authorized.
 * - 'no_project': The user is not assigned to any projects.
 * - 'no_organisation': The user is not assigned to any organisations and is not a system admin.
 * - 'generic': Other or unknown authorization failure.
 */
export type UnauthorizedReason = 'no_project' | 'no_organisation' | 'generic';

export type PermissionKey = Exclude<keyof ProjectPermissionsType, '__typename'>;

export type PermissionObject = Record<string, PermissionKey[]>;
/**
 * Shape of authorization data persisted in session storage.
 */
export type PermissionStorage = {
  role: Role;
  unauthorizedReason?: UnauthorizedReason;
  projects: PermissionObject;
};

export type AdminProfileResponse = MyAdminProfileQuery['myAdminProfile'];

export type ProfileProject = NonNullable<
  NonNullable<NonNullable<AdminProfileResponse>['projects']>['edges'][number]
>['node'];

export type ProfileOrganisation = NonNullable<
  NonNullable<
    NonNullable<AdminProfileResponse>['organisations']
  >['edges'][number]
>['node'];

export type AdminProfileData = {
  projects: NonNullable<ProfileProject>[];
  organisations: NonNullable<ProfileOrganisation>[];
  isSystemAdmin: boolean;
  isEventOrganiser: boolean;
};

export type AuthorizationDecision = {
  role: Role;
  unauthorizedReason?: UnauthorizedReason;
};

/**
 * Default fallback storage state used when an error occurs or authorization fails.
 */
export const DEFAULT_UNAUTHORIZED_STORAGE: PermissionStorage = {
  role: 'none',
  unauthorizedReason: 'generic',
  projects: {},
};

const ProjectList = RelayList<NonNullable<ProfileProject>>();
const OrganisationList = RelayList<NonNullable<ProfileOrganisation>>();

/**
 * Extracts and normalizes project nodes, organisation nodes, and administrative
 * privilege flags from the admin profile GraphQL response.
 *
 * @param profile - The admin profile query result node, or null/undefined.
 * @returns Normalized admin profile data.
 */
export function extractProfileData(
  profile?: AdminProfileResponse | null
): AdminProfileData {
  return {
    projects: ProjectList(profile?.projects).items,
    organisations: OrganisationList(profile?.organisations).items,
    isSystemAdmin: Boolean(profile?.isSystemAdministrator),
    isEventOrganiser: Boolean(profile?.isEventOrganiser),
  };
}

/**
 * Evaluates authorization rules to determine user role and reason:
 * 1. User must have at least one project assigned ('no_project').
 * 2. Non-system-administrators must belong to at least one organisation ('no_organisation').
 * 3. System administrators or users with assigned projects and organisations receive 'admin'.
 *
 * @param profile - The normalized admin profile data.
 * @returns The authorization decision containing role and optional unauthorizedReason.
 */
export function resolveAuthorization(
  profile: AdminProfileData
): AuthorizationDecision {
  const { projects, organisations, isSystemAdmin, isEventOrganiser } = profile;

  if (projects.length === 0) {
    return { role: 'none', unauthorizedReason: 'no_project' };
  }

  if (!isSystemAdmin && organisations.length === 0) {
    return { role: 'none', unauthorizedReason: 'no_organisation' };
  }

  if (isSystemAdmin || isEventOrganiser || organisations.length > 0) {
    return { role: 'admin' };
  }

  return { role: 'none', unauthorizedReason: 'generic' };
}

/**
 * Extracts active (truthy) permission keys for each project from their `myPermissions` payload.
 *
 * @param projects - List of profile projects.
 * @returns An object mapping project IDs to granted permission keys.
 */
export function getProjectPermissions(
  projects: NonNullable<ProfileProject>[]
): PermissionObject {
  const permissionObject: PermissionObject = {};

  projects.forEach((project) => {
    const permissions = project.myPermissions;

    if (permissions) {
      const projectPermissions = Object.entries(permissions).reduce(
        (acc: PermissionKey[], [permission, hasPermission]) => {
          if (hasPermission && permission !== '__typename') {
            return [...acc, permission as PermissionKey];
          }

          return acc;
        },
        []
      );

      permissionObject[project.id] = projectPermissions;
    }
  });

  return permissionObject;
}
