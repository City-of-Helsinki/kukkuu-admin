import RelayList from '../../api/relayList';
import dataProvider from '../../api/dataProvider';
import projectService from '../projects/projectService';
import type {
  ProjectNode,
  ProjectPermissionsType,
} from '../api/generatedTypes/graphql';

export const PERMISSIONS = 'permissions';

type Role = 'admin' | 'none';
type PermissionKey = Exclude<keyof ProjectPermissionsType, '__typename'>;
type PermissionObject = Record<string, PermissionKey[]>;
type PermissionStorage = {
  role: Role;
  projects: PermissionObject;
};

function getProjectPermissions(projects: ProjectNode[]) {
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

const ProjectList = RelayList<ProjectNode>();

export class AuthorizationService {
  constructor() {
    this.fetchRole = this.fetchRole.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
    this.getRole = this.getRole.bind(this);
    this.clear = this.clear.bind(this);
    this.hasProjectPermission = this.hasProjectPermission.bind(this);
    this.canPublishWithinProject = this.canPublishWithinProject.bind(this);
    this.canManageEventGroupsWithinProject =
      this.canManageEventGroupsWithinProject.bind(this);
    this.canSendMessagesToAllRecipientsWithinProject =
      this.canSendMessagesToAllRecipientsWithinProject.bind(this);
    this.canViewFamiliesWithinProject =
      this.canViewFamiliesWithinProject.bind(this);
  }

  private get permissionStorage(): null | PermissionStorage {
    const storage = sessionStorage.getItem(PERMISSIONS);

    if (!storage) {
      return null;
    }

    return JSON.parse(storage) as PermissionStorage;
  }

  async fetchRole(): Promise<void> {
    try {
      const { data } = await dataProvider.getMyAdminProfile();
      const projects = ProjectList((data as any)?.projects).items;
      const role = projects.length > 0 ? 'admin' : 'none';
      const projectPermissions = getProjectPermissions(projects);
      if (!projectService.projectId) {
        projectService.setDefaultProjectId(projects);
      }
      this.setPermissionStorage({ role, projects: projectPermissions });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch user role/permissions', error);
      this.setPermissionStorage({ role: 'none' });
    }
  }

  getRole(): Role | null {
    return this.permissionStorage?.role ?? null;
  }

  isAuthorized(): boolean {
    return this.getRole() !== null;
  }

  clear() {
    sessionStorage.removeItem(PERMISSIONS);
  }

  hasProjectPermission(permission: PermissionKey, projectId?: string) {
    if (!projectId) {
      return null;
    }
    const projectPermissions = this.getProjectPermissions(projectId);
    return projectPermissions.includes(permission);
  }

  canPublishWithinProject(projectId?: string) {
    return this.hasProjectPermission('publish', projectId);
  }

  canManageEventGroupsWithinProject(projectId?: string) {
    return this.hasProjectPermission('manageEventGroups', projectId);
  }

  canSendMessagesToAllRecipientsWithinProject(projectId?: string) {
    return this.hasProjectPermission('canSendToAllInProject', projectId);
  }

  canViewFamiliesWithinProject(projectId?: string) {
    return this.hasProjectPermission('viewFamilies', projectId);
  }

  private getProjectPermissions(projectId: string) {
    return this.permissionStorage?.projects[projectId] ?? [];
  }

  private setPermissionStorage(storage: Partial<PermissionStorage>) {
    const nextStorage = {
      ...this.permissionStorage,
      ...storage,
    };

    sessionStorage.setItem(PERMISSIONS, JSON.stringify(nextStorage));
  }
}

const authorizationService = new AuthorizationService();

export default authorizationService;
