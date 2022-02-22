/**
 * Only contain custom routes
 * Main app routes for example
 * login and logout is part of React-admin configurations.
 */
import * as React from 'react';
import { Route, Redirect } from 'react-router';

import CallbackPage from './domain/authentication/CallbackPage';
import UnauthorizedPage from './domain/authentication/UnauthorizedPage';
import TicketValidationPage from './domain/ticketValidation/TicketValidationPage';

export default [
  <Route exact path="/callback" component={CallbackPage} noLayout />,
  <Route exact path="/unauthorized" component={UnauthorizedPage} noLayout />,
  <Route
    exact
    path="/check-ticket-validity/:cryptographicallySignedCode"
    component={TicketValidationPage}
    noLayout
  />,
  <Redirect exact from="/event-groups" to="/events-and-event-groups" />,
  <Redirect exact path="/events" to="/events-and-event-groups" />,
];
