import dataProvider from '../../api/dataProvider';
import projectService from '../projects/projectService';
import {
  DEFAULT_UNAUTHORIZED_STORAGE,
  extractProfileData,
  getProjectPermissions,
  resolveAuthorization,
  type PermissionKey,
  type PermissionStorage,
  type Role,
  type UnauthorizedReason,
} from './authorizationUtils';

export const PERMISSIONS = 'permissions';

export type { Role, UnauthorizedReason };

export class AuthorizationService {
  constructor() {
    this.fetchRole = this.fetchRole.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
    this.getRole = this.getRole.bind(this);
    this.getUnauthorizedReason = this.getUnauthorizedReason.bind(this);
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
      const profile = extractProfileData(data);
      const { role, unauthorizedReason } = resolveAuthorization(profile);

      if (role === 'admin' && !projectService.projectId) {
        projectService.setDefaultProjectId(profile.projects);
      }

      this.setPermissionStorage({
        role,
        unauthorizedReason,
        projects: getProjectPermissions(profile.projects),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch user role/permissions', error);
      this.setPermissionStorage(DEFAULT_UNAUTHORIZED_STORAGE);
    }
  }

  getRole(): Role | null {
    return this.permissionStorage?.role ?? null;
  }

  getUnauthorizedReason(): UnauthorizedReason | null {
    return this.permissionStorage?.unauthorizedReason ?? null;
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
