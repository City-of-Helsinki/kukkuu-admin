import React from 'react';
import { useTranslate, useNotify } from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';

import userManager from './userManager';
import { fetchApiToken } from './api';

function OidcCallback(props: RouteChildrenProps) {
  const translate = useTranslate();
  const notify = useNotify();

  const onSuccess = (user: User) => {
    fetchApiToken(user.access_token)
      .then(apiToken => {
        localStorage.setItem('apiToken', apiToken);
        props.history.push('/');
      })
      .catch(error => {
        notify(translate('ra.message.error'), 'warning');
        // TODO Add Sentry
      });
  };
  const onError = (error: Error) => {
    notify(translate('ra.message.error'), 'warning');
    // TODO Add Sentry
  };

  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <p>{translate('authentication.redirect.text')}</p>
    </CallbackComponent>
  );
}

export default OidcCallback;
