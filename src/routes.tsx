import * as React from 'react';
import { Route } from 'react-router';

import LoginPage from './domain/authentication/components/LoginPage';
import OidcCallback from './domain/authentication/components/OidcCallback';

export default [
  <Route exact path="/callback" component={OidcCallback} />,
  <Route exact path="/login" component={LoginPage} />,
];
