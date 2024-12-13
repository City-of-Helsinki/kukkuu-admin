import { useDataProvider, useNotify } from 'react-admin';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import type extendedDataProvider from '../../../api/dataProvider';

const useMessageSendMutation = ({
  basePath,
  params,
}: {
  /** @deprecated - create with useResourceContext instead. */
  basePath: string;
  params: Parameters<(typeof extendedDataProvider)['send']>[1];
}) => {
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const navigate = useNavigate();
  const notify = useNotify();
  return useMutation({
    mutationFn: async () => await dataProvider.send('messages', { ...params }),
    onSuccess: () => {
      notify('messages.send.success');
      navigate(basePath);
    },
    onError: (error: Error) => {
      Sentry.captureException(error);
      notify('messages.send.error', { type: 'warning' });
    },
  });
};

export default useMessageSendMutation;
