import { MyAdminProfile_myAdminProfile_projects_edges_node as ProjectNode } from '../../api/generatedTypes/MyAdminProfile';
import RelayList from '../../api/relayList';
import dataProvider from '../../api/dataProvider';
import projectService from '../profile/profileService';

export const PERMISSIONS = 'permissions';

const ProjectList = RelayList<ProjectNode>();

export class AuthorizationService {
  constructor() {
    this.fetchRole = this.fetchRole.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
    this.getRole = this.getRole.bind(this);
    this.clear = this.clear.bind(this);
  }

  async fetchRole(): Promise<void> {
    try {
      const { data } = await dataProvider.getMyAdminProfile();
      const projects = ProjectList((data as any)?.projects).items;
      const role = projects.length > 0 ? 'admin' : 'none';

      projectService.setDefaultProjectId(projects);
      sessionStorage.setItem(PERMISSIONS, role);
    } catch (e) {
      sessionStorage.setItem(PERMISSIONS, 'none');
    }
  }

  isAuthorized(): boolean {
    return sessionStorage.getItem(PERMISSIONS) !== null;
  }

  getRole(): string | null {
    return sessionStorage.getItem(PERMISSIONS);
  }

  clear() {
    sessionStorage.removeItem(PERMISSIONS);
  }
}

export default new AuthorizationService();
