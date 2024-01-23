import { useMutation } from 'react-query';
import { useDataProvider } from 'react-admin';

import type extendedDataProvider from '../../../api/dataProvider';

const useSetReadyMutation = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  return useMutation({
    mutationFn: (params: Parameters<(typeof dataProvider)['setReady']>[1]) =>
      dataProvider.setReady('events', {
        ...params,
      }),
  });
};

export default useSetReadyMutation;
