import type { ProjectNode } from '../api/generatedTypes/graphql';

const PROJECT_ID_KEY = 'projectId';

type Listener = (projectId: string | null) => void;

class ProjectService {
  private listeners = new Set<Listener>();

  get projectId(): string | null {
    return localStorage.getItem(PROJECT_ID_KEY);
  }

  set projectId(id: string | null) {
    if (id) {
      localStorage.setItem(PROJECT_ID_KEY, id);
      this.notify();
    }
  }

  /**
   * Subscribes a listener to project ID changes.
   * @param listener - A function that will be called when the project ID changes.
   * @returns An unsubscribe function to remove the listener.
   */
  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

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
    this.notify();
  }

  private notify() {
    this.listeners.forEach((l) => l(this.projectId));
  }
}

const projectService = new ProjectService();

export default projectService;
