import get from 'lodash/get';
import React from 'react';
import {
  useTranslate,
  useQuery,
  Loading,
  useLocale,
  useNotify,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import { getTranslatedField } from '../../common/translation/TranslationUtils';

export default () => {
  const translate = useTranslate();
  const locale = useLocale();
  const notify = useNotify();

  // It should be possible to do this more easily with useGetOne hook,
  // but for some reason it didn't seem to work here.
  const { data, loaded } = useQuery(
    {
      type: 'getOne',
      resource: 'projects',
      payload: { id: projectService.projectId },
    },
    {
      onFailure: (error: Error) => {
        Sentry.captureException(error);
        notify(translate('ra.message.error'), 'warning');
      },
    }
  );

  if (!loaded) return <Loading />;

  return (
    <Card>
      <CardHeader title={translate('dashboard.title')} />
      {data ? (
        <CardContent>
          {data.year} {get(data, getTranslatedField('name', locale))}
        </CardContent>
      ) : null}
    </Card>
  );
};
