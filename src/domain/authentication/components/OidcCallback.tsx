import React from 'react';
import {
  useTranslate,
  useNotify,
  useDataProvider,
  useLogout,
} from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';

import userManager from '../userManager';
import { fetchApiToken } from '../api';
import { setAdminProfile } from '../../profile/utils';

function OidcCallback(props: RouteChildrenProps) {
  const translate = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const logout = useLogout();

  const handleError = (error: Error) => {
    notify(translate('ra.message.error'), 'warning');
    console.error(error);
    logout();
    // TODO Add Sentry
  };

  const onSuccess = (user: User) => {
    fetchApiToken(user.access_token)
      .then((apiToken) => {
        localStorage.setItem('apiToken', apiToken);
        return dataProvider.getMyAdminProfile();
      })
      .then(({ data }) => {
        setAdminProfile(data);
        props.history.push('/');
      })
      .catch((error) => {
        console.error('fetchApiToken caught error');
        handleError(error);
      });
  };
  const onError = (error: Error) => {
    handleError(error);
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
