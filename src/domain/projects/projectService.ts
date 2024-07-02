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

    // eslint-disable-next-line no-console
    console.info(
      'Choosing the closest project to current year as a default project and setting it as an active one.',
      {
        projects,
        defaultProject,
      }
    );

    this.projectId = defaultProject.id;
  }

  clear() {
    // eslint-disable-next-line no-console
    console.debug('Clearing the selected project from the local storage.');
    localStorage.removeItem(PROJECT_ID_KEY);
  }
}

const projectService = new ProjectService();

export default projectService;
