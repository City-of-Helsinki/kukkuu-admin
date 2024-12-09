import { useMutation } from 'react-query';
import { useDataProvider } from 'react-admin';

import type extendedDataProvider from '../../../api/dataProvider';

const useSetReadyMutation = () => {
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  return useMutation({
    mutationFn: (params: Parameters<(typeof dataProvider)['setReady']>[1]) =>
      dataProvider.setReady('events', {
        ...params,
      }),
  });
};

export default useSetReadyMutation;
