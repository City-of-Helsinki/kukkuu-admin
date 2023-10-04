import { useDataProvider, useNotify } from 'react-admin';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import extendedDataProvider from '../../../api/dataProvider';

const useMessageSendMutation = ({
  basePath,
  params,
}: {
  /** @deprecated - create with useResourceContext instead. */
  basePath: string;
  params: Parameters<(typeof extendedDataProvider)['send']>[1];
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const navigate = useNavigate();
  const notify = useNotify();
  return useMutation({
    mutationFn: () => dataProvider.send('messages', { ...params }),
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
