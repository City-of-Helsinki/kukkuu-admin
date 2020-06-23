import { useEffect } from 'react';

import userManager from '../userManager';

const Logout = () => {
  useEffect(() => {
    console.log('logout from Logout.tsx');
    userManager.signoutRedirect();
  });
  return null;
};

export default Logout;
