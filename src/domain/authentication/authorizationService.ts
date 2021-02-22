import {
  MyAdminProfile_myAdminProfile_projects_edges_node as ProjectNode,
  MyAdminProfile_myAdminProfile_projects_edges_node_myPermissions as ProjectPermissions,
} from '../../api/generatedTypes/MyAdminProfile';
import RelayList from '../../api/relayList';
import dataProvider from '../../api/dataProvider';
import projectService from '../profile/profileService';

export const PERMISSIONS = 'permissions';

type Role = 'admin' | 'none';
type PermissionKey = keyof ProjectPermissions;
type PermissionObject = {
  [id: string]: PermissionKey[];
};
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
    this.canPublishWithinProject = this.canPublishWithinProject.bind(this);
    this.canManageEventGroupsWithinProject = this.canManageEventGroupsWithinProject.bind(
      this
    );
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

      projectService.setDefaultProjectId(projects);
      this.setPermissionStorage({ role, projects: projectPermissions });
    } catch (e) {
      this.setPermissionStorage({ role: 'none' });
    }
  }

  getRole(): Role | null {
    return this.permissionStorage?.role || null;
  }

  isAuthorized(): boolean {
    return this.getRole() !== null;
  }

  clear() {
    sessionStorage.removeItem(PERMISSIONS);
  }

  canPublishWithinProject(projectId?: string) {
    if (!projectId) {
      return null;
    }

    const projectPermissions = this.getProjectPermissions(projectId);

    return projectPermissions.includes('publish');
  }

  canManageEventGroupsWithinProject(projectId?: string) {
    if (!projectId) {
      return null;
    }

    const projectPermissions = this.getProjectPermissions(projectId);

    return projectPermissions.includes('manageEventGroups');
  }

  private getProjectPermissions(projectId: string) {
    return this.permissionStorage?.projects[projectId] || [];
  }

  private setPermissionStorage(storage: Partial<PermissionStorage>) {
    const nextStorage = {
      ...this.permissionStorage,
      ...storage,
    };

    sessionStorage.setItem(PERMISSIONS, JSON.stringify(nextStorage));
  }
}

export default new AuthorizationService();
