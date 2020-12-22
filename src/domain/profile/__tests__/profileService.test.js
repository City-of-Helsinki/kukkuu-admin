import profileService from '../profileService';

describe('profileService', () => {
  describe('projectId', () => {
    it('should allow project id to be set and got', () => {
      expect(profileService.projectId).toEqual(null);

      profileService.projectId = '1';

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(profileService.projectId).toEqual('1');
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

      profileService.setDefaultProjectId(projects);

      expect(profileService.projectId).toEqual('1');
    });
  });

  describe('clear', () => {
    it('should clear localStorage of data from this service', () => {
      profileService.clear();

      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });

    it('should clear project id', () => {
      profileService.projectId = '1';

      profileService.clear();

      expect(profileService.projectId).toEqual(null);
    });
  });
});
