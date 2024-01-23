import { useDataProvider, useNotify } from 'react-admin';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import type extendedDataProvider from '../../../api/dataProvider';

const handleErrorMessage = (error: Error) => {
  if (
    error.message === 'All events are not ready for event group publishing.'
  ) {
    return 'eventGroups.actions.publish.eventsNotReadyError';
  }

  return 'eventGroups.actions.publish.error';
};

const usePublishEventGroupMutation = ({
  basePath,
  params,
}: {
  basePath: string;
  params: Parameters<(typeof extendedDataProvider)['publish']>[1];
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const navigate = useNavigate();
  const notify = useNotify();
  return useMutation({
    mutationFn: () =>
      dataProvider.publish('event-groups', {
        ...params,
      }),
    onSuccess: () => {
      notify('eventGroups.actions.publish.success');
      navigate(basePath);
    },
    onError: (error: Error) => {
      Sentry.captureException(error);
      notify(handleErrorMessage(error), { type: 'warning' });
    },
  });
};

export default usePublishEventGroupMutation;
