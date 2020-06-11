import { useEffect } from 'react';

import userManager from '../userManager';

const Logout = () => {
  useEffect(() => {
    userManager.signoutRedirect();
  });
  return null;
};

export default Logout;
