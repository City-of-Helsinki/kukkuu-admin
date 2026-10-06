/* eslint-disable @typescript-eslint/unbound-method */
import projectService from '../projectService';

describe('projectService', () => {
  beforeEach(() => {
    projectService.clear();
    vi.clearAllMocks();
  });

  describe('projectId', () => {
    it('should allow project id to be set and got', () => {
      expect(projectService.projectId).toEqual(null);

      projectService.projectId = '1';

      expect(localStorage.setItem).toHaveBeenCalledWith('projectId', '1');
      expect(projectService.projectId).toEqual('1');
      expect(localStorage.getItem).toHaveBeenCalledWith('projectId');
    });

    it('should notify listeners when project id is set', () => {
      const listener = vi.fn();
      projectService.subscribe(listener);

      projectService.projectId = '1';

      expect(listener).toHaveBeenCalledWith('1');
    });
  });

  describe('subscribe', () => {
    it('should allow listeners to unsubscribe', () => {
      const listener = vi.fn();
      const unsubscribe = projectService.subscribe(listener);

      unsubscribe();
      projectService.projectId = '2';

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('setDefaultProjectId', () => {
    it('should set the recent most project as the default one', () => {
      const projects = [
        {
          id: '1',
          year: 1999,
        },
        {
          id: '2',
          year: 1998,
        },
      ];

      projectService.setDefaultProjectId(projects);

      expect(projectService.projectId).toEqual('1');
    });
  });

  describe('clear', () => {
    it('should clear localStorage of data from this service', () => {
      projectService.clear();

      expect(localStorage.removeItem).toHaveBeenCalledWith('projectId');
    });

    it('should clear project id', () => {
      projectService.projectId = '1';

      projectService.clear();

      expect(projectService.projectId).toEqual(null);
    });

    it('should notify listeners on clear', () => {
      const listener = vi.fn();
      projectService.subscribe(listener);

      projectService.clear();

      expect(listener).toHaveBeenCalledWith(null);
    });
  });
});
