/**
 * Only contain custom routes
 * Main app routes for example
 * login and logout is part of React-admin configurations.
 */
import * as React from 'react';
import { Route } from 'react-router';

import OidcCallback from './domain/authentication/components/OidcCallback';

export default [<Route exact path="/callback" component={OidcCallback} />];
