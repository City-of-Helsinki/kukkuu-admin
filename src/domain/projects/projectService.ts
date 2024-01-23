import type { ProjectNode } from '../api/generatedTypes/graphql';

const PROJECT_ID_KEY = 'projectId';

class ProjectService {
  get projectId(): string | null {
    return localStorage.getItem(PROJECT_ID_KEY);
  }

  set projectId(id: string | null) {
    if (id) {
      localStorage.setItem(PROJECT_ID_KEY, id);
    }
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

const projectService = new ProjectService();

export default projectService;
