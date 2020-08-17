import { MyAdminProfile_myAdminProfile as MyAdminProfile } from '../../api/generatedTypes/MyAdminProfile';

const PROJECT_ID_KEY = 'projectId';

const setAdminProfile = (data: MyAdminProfile) => {
  // TODO we assume users have only one project ATM, and use just the first one
  const projectId = data.projects.edges[0]?.node?.id;
  if (projectId !== undefined) {
    localStorage.setItem(PROJECT_ID_KEY, projectId);
  } else {
    localStorage.removeItem(PROJECT_ID_KEY);
  }
};

const removeAdminProfile = () => {
  localStorage.removeItem(PROJECT_ID_KEY);
};

const getProjectId = () => {
  return localStorage.getItem(PROJECT_ID_KEY);
};

export { setAdminProfile, removeAdminProfile, getProjectId };
