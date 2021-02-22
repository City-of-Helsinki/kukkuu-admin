import projectService from '../projectService';

describe('projectService', () => {
  describe('projectId', () => {
    it('should allow project id to be set and got', () => {
      expect(projectService.projectId).toEqual(null);

      projectService.projectId = '1';

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(projectService.projectId).toEqual('1');
      expect(localStorage.getItem).toHaveBeenCalledTimes(2);
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

      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });

    it('should clear project id', () => {
      projectService.projectId = '1';

      projectService.clear();

      expect(projectService.projectId).toEqual(null);
    });
  });
});
