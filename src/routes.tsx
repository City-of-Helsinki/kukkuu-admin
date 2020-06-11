/**
 * Only contain custom routes
 * Main app routes for example
 * login and logout is part of React-admin configurations.
 */
import * as React from 'react';
import { Route } from 'react-router';

import OidcCallback from './domain/authentication/components/OidcCallback';
import UnauthorizedPage from './domain/authentication/components/UnauthorizedPage';
import Logout from './domain/authentication/components/Logout';

export default [
  <Route exact path="/callback" component={OidcCallback} />,
  <Route exact path="/unauthorized" component={UnauthorizedPage} noLayout />,
  <Route exact path="/logout" component={Logout} />,
];
