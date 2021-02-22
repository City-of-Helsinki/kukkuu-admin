// eslint-disable-next-line max-len
import { MyAdminProfile_myAdminProfile_projects_edges_node as ProjectNode } from '../../api/generatedTypes/MyAdminProfile';

const PROJECT_ID_KEY = 'projectId';

class ProjectService {
  set projectId(id: string | null) {
    if (id) {
      localStorage.setItem(PROJECT_ID_KEY, id);
    }
  }

  get projectId(): string | null {
    return localStorage.getItem(PROJECT_ID_KEY);
  }

  setDefaultProjectId(projects: ProjectNode[]) {
    const defaultProject = projects.reduce(
      (incumbent, project) =>
        incumbent.year >= project.year ? incumbent : project,
      projects[0]
    );

    this.projectId = defaultProject.id;
  }

  clear() {
    localStorage.removeItem(PROJECT_ID_KEY);
  }
}

export default new ProjectService();
