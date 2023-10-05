import get from 'lodash/get';
import React from 'react';
import {
  useTranslate,
  useGetOne,
  Loading,
  useNotify,
  useLocaleState,
} from 'react-admin';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import { getTranslatedField } from '../../common/translation/TranslationUtils';
import { Project_project } from '../../api/generatedTypes/Project';

const Dashboard = () => {
  const translate = useTranslate();
  const [locale] = useLocaleState();
  const notify = useNotify();

  const { data, isLoading } = useGetOne<Project_project>(
    'projects',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { id: projectService.projectId! },
    {
      onError: (error) => {
        Sentry.captureException(error);
        notify(translate('ra.message.error'), { type: 'warning' });
      },
    }
  );

  if (isLoading) return <Loading />;

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

export default Dashboard;
