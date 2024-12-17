import { useDataProvider, useNotify } from 'react-admin';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import type extendedDataProvider from '../../../api/dataProvider';

const usePublishEventMutation = ({
  basePath,
  params,
}: {
  basePath: string;
  params: Parameters<(typeof extendedDataProvider)['publish']>[1];
}) => {
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const navigate = useNavigate();
  const notify = useNotify();
  return useMutation({
    mutationFn: async () =>
      await dataProvider.publish('events', {
        ...params,
      }),
    onSuccess: () => {
      notify('events.show.publish.onSuccess.message');
      navigate(basePath);
    },
    onError: (error: Error) => {
      Sentry.captureException(error);
      notify('events.show.publish.onFailure.message', { type: 'warning' });
    },
  });
};

export default usePublishEventMutation;
